
const blocksWrapper = document.querySelector('.blocks-wrapper')
const blocks = document.querySelectorAll('.blocks-wrapper div')
const playground = document.querySelector('.playground')
let dragSrcEl;
let pg;

const handleDragStart = (e) => {
    if(!e.target.hasAttribute('data-block-id')){
        e.target.style.opacity = '0.4';
        dragSrcEl = e.target.cloneNode(true);
    }else{
        dragSrcEl = e.target
    }
    

    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', e.target.innerHTML);
}

const handleDragEnd = (e) => {
    e.target.style.opacity = '1';

    blocks.forEach(function (item) {
        item.classList.remove('over');
    });
}

const handleDragOver = (e) => {
    e.preventDefault();
    return false;
}

const handleDrop = (e) => {
    e.stopPropagation();

    if(!dragSrcEl.hasAttribute('data-block-id')){
        const block = getBlockCopy(dragSrcEl);
        playground.innerHTML += block
        pg = playground.cloneNode(true)
    }

    return false;
}

const handleDropBack = (e) => {
    e.stopPropagation();

   const newChildrens = [];
   console.log(pg);
   for (let i = 0; i < pg.children.length; i++) {
    const blk = pg.children[i];
    const wrapper = document.createElement('div')
    wrapper.append(blk)

    console.log(blk, dragSrcEl);
    if(blk !== dragSrcEl){
        newChildrens.push(wrapper.innerHTML)
    }
   } 

   playground.innerHTML = ''
   newChildrens.forEach(nC => playground.innerHTML += nC)
    
   pg = playground.cloneNode(true)
   return false;
}

blocks.forEach(function (block) {
    block.addEventListener('dragstart', handleDragStart);
    block.addEventListener('dragend', handleDragEnd);
})
playground.addEventListener('drop', handleDrop);
playground.addEventListener('dragstart', handleDragStart);
playground.addEventListener('dragover', handleDragOver);
playground.addEventListener('dragend', handleDragEnd);

blocksWrapper.addEventListener('drop', handleDropBack);
blocksWrapper.addEventListener('dragstart', handleDragStart);
blocksWrapper.addEventListener('dragover', handleDragOver);
blocksWrapper.addEventListener('dragend', handleDragEnd);