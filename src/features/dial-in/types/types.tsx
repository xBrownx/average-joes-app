export type DialInScreenProps = {
    onNext: () => void,
    onBack: () => void,
    onExit: () => void,
    onShow: () => void,
    speak: (thingsToSay: string | string[]) => void,
}