import { View, Image, ScrollView } from 'react-native';

const dummyData = [
  {
    id: 1,
    image: 'https://www.apple.com/newsroom/images/live-action/wwdc-2023/standard/watchos-10/Apple-WWDC23-watchOS-10-5up-230605_big.jpg.large_2x.jpg',
  },
  {
    id: 2,
    image: 'https://www.apple.com/v/mac-mini/w/images/overview/bento-gallery/2d_pf__en2v80tcytua_xlarge_2x.jpg',
  },
  {
    id: 3,
    image: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple-MacBook-Pro-M2-Pro-and-M2-Max-hero-230117_Full-Bleed-Image.jpg.xlarge_2x.jpg',
  },
];

const RecommendationCards = ({ data = dummyData }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="px-4 pt-4">
      {data.map((item, index) => (
        <View
          key={index}
          className="w-[300px] h-[150px] bg-[#ccffb3] rounded-[20px] mr-4"
        >
          <Image
            source={{ uri: item.image }}
            className="w-full h-full rounded-[20px]"
            resizeMode="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default RecommendationCards;
