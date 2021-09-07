import MainBlock from "./components/MainBlock/MainBlock";

const mainBlock = new MainBlock()
const mainBlockElem = mainBlock.generateLayout()
document.body.prepend( mainBlockElem)