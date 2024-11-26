import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { openExternalUrl } from "@/util/open-url";


const INSTA_FEED = [
    {
        id: '00',
        thumbImg: require('@/assets/images/insta-00.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '01',
        thumbImg: require('@/assets/images/insta-01.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '02',
        thumbImg: require('@/assets/images/insta-02.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '03',
        thumbImg: require('@/assets/images/insta-03.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '04',
        thumbImg: require('@/assets/images/insta-04.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '05',
        thumbImg: require('@/assets/images/insta-05.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '06',
        thumbImg: require('@/assets/images/insta-06.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '07',
        thumbImg: require('@/assets/images/insta-07.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
    {
        id: '08',
        thumbImg: require('@/assets/images/insta-08.jpg'),
        link: 'https://www.instagram.com/reel/DClVm7yviT-/'
    },
]

export function InstaFeed() {
    return (
        <View style={styles.container}>
            {INSTA_FEED.map((item) => (

                <View
                    key={item.id}
                    style={styles.imageContainer}
                >
                    <TouchableOpacity style={styles.inner} onPress={() => openExternalUrl(item.link)}>
                        <Image
                            source={item.thumbImg}
                            style={styles.image}
                            resizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>

            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 4,
        width: '100%',
        justifyContent: 'space-between',
    },
    inner: {
        padding: 0,
        margin: 0,
    },
    imageContainer: {
        width: '32.5%',
        aspectRatio: 9 / 16
    },
    image: {
        width: '100%',
        aspectRatio: 9 / 16,
        height: 'auto',
        borderRadius: 8,
    }
})