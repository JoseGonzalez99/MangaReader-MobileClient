import BottomDrawer from "@/components/atoms/BottomDrawer";
import { ChapterSourceSelector } from "@/components/reader/ChapterSourceSelector";
import ReaderChapterSelector from "@/components/reader/ReaderChapterSelector";
import ReaderParams from "@/components/reader/ReaderParameters";
import { ReaderTabs } from "@/components/reader/ReaderTabs";
import { Manga } from "@/dtos/mangareader.dto";
import { useAppStore } from "@/store/Slices";
import { getNextChapter } from "@/utils/readerUtils";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import ImageViewing from "react-native-image-viewing";

export default function ReaderScreen() {
  const selectedChapter = useAppStore((s) => s.selectedChapter);

  const setSelectedChapter = useAppStore((s) => s.setSelectedChapter);
  const selectedManga = useAppStore((s) => s.selectedManga);
  const selectedChapterSource = useAppStore((s) => s.selectedChapterSource);
  const userPreferences = useAppStore((s) => s.userPreferences);
  const chapters = useAppStore((s) => s.chapters);

  const fetchAllChaptersOfManga = useAppStore((s) => s.fetchAllChaptersOfManga);
  const fetchPages = useAppStore((s) => s.fetchPages);

  const [showChaptersDrawer, setShowChaptersDrawer] = useState(false);
  const [showParamsDrawer, setShowParamsDrawer] = useState(false);
  const pages = useAppStore((s) => s.pages);

  const [showReaderTabs, setShowReaderTabs] = useState(true);

  //El siguiente useEffect debe dividirse siguiendo estas reglas.
  //UserPreference se inicializa el objeto de prefencias del usuario dsde el backend y lo guardamos en el estado. este deberia ejecutarse cada ves que  userPreference.
  //loadCompleteChapterList,se ejecuta cada ves que se cambia de manga, y es para que se tenga la lista completa de capitulos
  //loadPages sirve para cargar las paginas del capitulo actual y debe actualizarse cada ves que se cambia un capitulo seleccionado y/o ChapterSource
  //
  // ✅ Cargar capítulos al cambiar de manga
  useEffect(() => {
    if (selectedManga) {
      fetchAllChaptersOfManga(selectedManga.id);
    }
  }, [selectedManga]);

  // ✅ Cargar páginas al cambiar de capítulo o fuente
  useEffect(() => {
    if (selectedChapter?.id && selectedChapterSource?.languageCode) {
      fetchPages(selectedChapter.id, selectedChapterSource.languageCode);
    }
  }, [selectedChapter, selectedChapterSource]);

  // 👇 Future: usar userPreferences si hay lógica dependiente
  // useEffect(() => {
  //   if (userPreferences) {
  //     // aplicar algún efecto o lógica si se cambia el modo de lectura, etc.
  //   }
  // }, [userPreferences]);

  /*Funciones de utilidad */
  const toggleReaderParamDrawer = () => {
    setShowParamsDrawer(!showParamsDrawer);
  };
  const onNextChapter = () => {
    const next = getNextChapter(chapters, selectedChapter);
    if (next) {
      setSelectedChapter(next);
    } else {
      router.push(`/(app)/(main)/manga/${(selectedManga as Manga).id}`);
    }
  };
  const toggleReaderChapterListDrawer = () => {
    setShowChaptersDrawer(!showChaptersDrawer);
  };
  console.log("showReaderTabs:" + showReaderTabs);

  const images = (
    (userPreferences?.readingDirection as "ltr" | "rtl") === "rtl"
      ? [...pages].reverse()
      : pages
  ).map((p) => ({
    uri: p.imageUrl,
  }));
  return (
    <View className="flex-1 bg-background p-4 ">
      {selectedChapterSource == null && <ChapterSourceSelector />}
      {selectedChapterSource != null && (
        <View className="flex-1">
          <ImageViewing
            images={images}
            imageIndex={0}
            visible={true}
            swipeToCloseEnabled={false}
            doubleTapToZoomEnabled={true}
            onRequestClose={() => {}}
            HeaderComponent={() => (
              <TouchableOpacity
              onPress={() => setShowReaderTabs((prev) => !prev)}
              className="absolute top-10 right-5 z-50 bg-black/70 px-4 py-2 rounded-full flex-row items-center gap-x-2"
            >
              {showReaderTabs ? (
                <>
                  <Text className="text-white text-xs opacity-90">Ocultar barra de navegación</Text>
                  <FontAwesome name="eye-slash" size={20} color="#fff" />
                </>
              ) : (
                <>
                  <Text className="text-white text-xs opacity-90">Mostrar barra de navegación</Text>
                  <FontAwesome name="eye" size={20} color="#fff" />
                </>
              )}
            </TouchableOpacity>
            )}
            FooterComponent={() =>
              showReaderTabs ? (
                <View className="absolute bottom-6 left-0 right-0 z-50">
                  <ReaderTabs
                    onChaptersTab={toggleReaderChapterListDrawer}
                    onReaderConfigTab={toggleReaderParamDrawer}
                    onNextChapter={onNextChapter}
                  />
                </View>
              ) : null
            }
          />
          <BottomDrawer
            isVisible={showParamsDrawer}
            scrollable={false} // 👈 MUY IMPORTANTE
            title="Configuraciones"
            onClose={toggleReaderParamDrawer}
          >
            <ReaderParams />
          </BottomDrawer>

          <BottomDrawer
            isVisible={showChaptersDrawer}
            onClose={toggleReaderChapterListDrawer}
            title="Lista de Capitulos"
            scrollable={false} // 👈 MUY IMPORTANTE
          >
            <ReaderChapterSelector />
          </BottomDrawer>
        </View>
      )}
    </View>
  );
}
