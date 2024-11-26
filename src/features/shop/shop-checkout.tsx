import { WebView } from 'react-native-webview';
import { FunctionComponent } from "react"
type Props = {
    route: any;
}

const CheckoutCoreScreen: FunctionComponent<Props> = ({route}) => {
  const { uri } = route.params;
  return <WebView source={{ uri }} />;
}

export default CheckoutCoreScreen;