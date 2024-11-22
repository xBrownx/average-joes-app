import { DimensionValue, Image, ImageProps } from "react-native";
import React from "react";

type AutoScaledImageProps = ImageProps & {
    widthPercent: DimensionValue,
}

export function AutoScaledImage({source, widthPercent}: AutoScaledImageProps) {

    const [height, setHeight] = React.useState(0);

    function getScaledHeight(scaledWidth: number) {
        const asset = Image.resolveAssetSource(source!);
        const widthRatio = scaledWidth / asset.width;
        setHeight(asset.height * widthRatio);
    }

    return (
        <Image
            source={source}
            resizeMode='contain'
            style={{width: widthPercent, height: height}}
            onLayout={(e) => getScaledHeight(e.nativeEvent.layout.width)}
        />
    );
}