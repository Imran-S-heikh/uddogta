import { atom } from "recoil";

const SpinLoaderState = atom({
    key: 'SPIN_LOADING_STATE',
    default: false
})

export default SpinLoaderState;