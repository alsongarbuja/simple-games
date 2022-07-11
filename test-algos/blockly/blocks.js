
let blockId = 0;

const getBlockCopy = (ele) => {
    const innerEle = ele.children[0]
    innerEle.setAttribute('draggable', 'true');
    innerEle.setAttribute('data-block-id', blockId)
    innerEle.style.display = "inline-block"

    const wrapper = document.createElement('div')
    wrapper.append(innerEle)

    blockId++;

    return wrapper.innerHTML;
}