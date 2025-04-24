// components/reader/ReaderDrawers.tsx
import BottomDrawer from "@/components/atoms/BottomDrawer";
import ReaderChapterSelector from "@/components/reader/ReaderChapterSelector";
import ReaderParams from "@/components/reader/ReaderParameters";

interface Props {
  showParamsDrawer: boolean;
  showChaptersDrawer: boolean;
  toggleParamsDrawer: () => void;
  toggleChaptersDrawer: () => void;
}

export default function ReaderDrawers({
  showParamsDrawer,
  showChaptersDrawer,
  toggleParamsDrawer,
  toggleChaptersDrawer,
}: Props) {
  return (
    <>
      <BottomDrawer
        isVisible={showParamsDrawer}
        scrollable={true}
        title="Configuraciones"
        onClose={toggleParamsDrawer}
      >
        <ReaderParams />
      </BottomDrawer>

      <BottomDrawer
        isVisible={showChaptersDrawer}
        onClose={toggleChaptersDrawer}
        title="Lista de Capitulos"
        scrollable={false}
      >
        <ReaderChapterSelector />
      </BottomDrawer>
    </>
  );
}
