import BigCoverCard from "@/components/atoms/BigCoverCard";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { colors } from "@/constants/colors";
import { View ,Text, ScrollView, FlatList} from "react-native";

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Último leído</Text>
            <BigCoverCard {...homevalue.lastReaded} />
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial</Text>
            <FlatList
                data={homevalue.historial}
                renderItem={({ item }) => <SmallCoverCard {...item} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: colors.background,
	},
	section: {
		marginBottom: 40,
	},
	sectionTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 20,
		color: colors.text,
	},
	bigCard: {
		height: 250,
		borderRadius: 10,
		overflow: 'hidden',
		justifyContent: 'flex-end',
	},
	smallCard: {
		height: 150,
		width: 100,
		borderRadius: 10,
		overflow: 'hidden',
		marginRight: 10,
		justifyContent: 'flex-end',
	},
	cardImage: {
		borderRadius: 10,
	},
	bigCardContent: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 10,
	},
	smallCardContent: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 5,
	},
	bigCardTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	smallCardTitle: {
		fontSize: 14,
		color: '#fff',
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	bigCardRating: {
		fontSize: 14,
		color: '#fff',
		marginLeft: 5,
	},
})

