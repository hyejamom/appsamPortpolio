$(() => {


    // modal
    $('.detailBtn').on('click',(e)=>{
        let detailNumber = $(e.target).data('number')
        $('.modal').addClass('showDetail')
        $(`.detail_${detailNumber}`).css({'display':'block'})
    })
    $('.checkBtn').on('click',(e)=>{
        let checkNumber = $(e.target).data('number')
        $('.modal').addClass('showCheck')
        $(`.check_${checkNumber}`).css({'display':'block'})
    })

    $('.modal_x').on('click',()=>{
        $('.modal').removeClass('showDetail')
        $('.modal').removeClass('showCheck')
        $('[class^="detail_"]').css({'display':'none'})
        $('[class^="check_"]').css({'display':'none'})
    })


    // nav
    $('.list a').on('mouseover', () => {
        $('nav').addClass('active')
    })
    $('nav').on('mouseleave', () => {
        $('nav').removeClass('active')
    })


    // main slide
    let slideMove = 1;
    let isAnimating = false;
    const activeAnimation = () => {
        $('[class^="slide_"] .textBox').removeClass('active')
        setTimeout(() => {
            $(`.slide_${slideMove} .textBox`).addClass('active')
        }, 500)
        $('.loadingBar').animate({'width':`${25*slideMove}%`})
        $('.pageBox span:first').text(`0${slideMove}`)
    }
    const prevMove = () => {
        $('.slideBox [class^="slide_"]:last').prependTo('.slideMoveBox')
        $('.slideMoveBox').animate({ 'left': '-100%' }, 0)
        $('.slideMoveBox').animate({ 'left': '0px' }, 500)
        if (slideMove >= 2) {
            slideMove--
            activeAnimation()
        }
        else if (slideMove === 1) {
            slideMove = 4
            activeAnimation()
        }
    }
    const nextMove = () => {
        $('.slideMoveBox').animate({ 'left': '-100%' }, 500)
        setTimeout(() => {
            $('.slideBox [class^="slide_"]:first').appendTo('.slideMoveBox')
        }, 500)
        $('.slideMoveBox').animate({ 'left': '0px' }, 0)
        // 글씨
        if (slideMove <= 3) {
            slideMove++
            activeAnimation()
        }
        else if (slideMove === 4) {
            slideMove = 1
            activeAnimation()
        }
    }
    const startAutoSlideMove = ()=>{
        autoSlideMove = setInterval(()=>{
            nextMove();
        },4000)
    }
    startAutoSlideMove();
    $('.nextBtn').on('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            nextMove();
            clearInterval(autoSlideMove)
            setTimeout(() => { isAnimating = false; startAutoSlideMove() }, 2500)
        }
    })
    $('.prevBtn').on('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            prevMove();
            clearInterval(autoSlideMove)
            setTimeout(() => { isAnimating = false; startAutoSlideMove() }, 2500)
        }
    })
    const tabClick = (e) => {
        contentMove = 0;
        $('.contentBtnLeft').removeClass('able')
        $('.contentBtnRight').addClass('able')
        $('.contentClickMenu>button').removeClass('choice');
        $(e.target).addClass('choice');
        $('.contentMoveSlideBox').css({ 'left': '0px' });
    }
    const colorClick = (e, colorClass) => {
        contentMove = 0;
        $('.contentBtnLeft').removeClass('able')
        $('.contentBtnRight').addClass('able')
        $('.contentMoveSlideBox>div').removeClass('flexBox');
        $('.contentMoveSlideBox').css({ 'left': '0px' });
        $('.contentClickMenu>button').removeClass('choice');
        $(e.target).addClass('choice');
        $(`.contentMoveSlideBox>.${colorClass}`).addClass('flexBox');
    }


    // content tab
    $('.contentClickMenu>button').on('click', (e) => {
        const colorClass = $(e.target).data('color'); // Assuming each button has a data-color attribute
        $('.contentMoveSlideBox>div').addClass('flexBox');
        if (colorClass) {
            colorClick(e, colorClass);
        } else {
            tabClick(e);
        }
    });


    // contant slide
    let contentLength = $('.contentMoveSlideBox>.flexBox').length
    let contentMoveSlideBoxWidth = 50 * contentLength
    let contentMove = 0
    let updateContentLength = 4
    const arrowAble = (e)=>{
        if(contentMove === 0){
            $('.contentBtnLeft').removeClass('able')
        }
        else if(contentMove >= 1 && contentMove < e-2) {
            $('.contentBtnLeft').addClass('able')
            $('.contentBtnRight').addClass('able')
        }
        else if(contentMove === e-2){
            $('.contentBtnRight').removeClass('able')
        }
    }
    $('.contentMoveSlideBox').width(`${contentMoveSlideBoxWidth}%`);
    $('.contentMoveSlideBox>div').width(100 / contentLength + '%')
    const contetnRightMove = (e)=>{
        if(contentMove < e-2){
            contentMove++
            $('.contentMoveSlideBox').animate({'left':`-${50*contentMove}%`})
        }
        else if(contentMove === e-2) {
            contentMove = e-2
            $('.contentMoveSlideBox').animate({'left':`-${50*contentMove}%`})
        }
    }
    const contetnLeftMove = ()=>{
        if(contentMove >= 1){
            contentMove--
            $('.contentMoveSlideBox').animate({'left':`-${50*contentMove}%`})
        }
        else if(contentMove === 0) {
            contentMove = 0
            $('.contentMoveSlideBox').animate({'left':`0%`})
        }
    }
    $('.contentBtnRight').on('click',()=>{
        if($('.allBtn').hasClass('choice')){
            contetnRightMove(contentLength)
            arrowAble(contentLength)
        }
        else if($('.contentClickMenu button:not(.allBtn)')){
            contetnRightMove(updateContentLength)
            arrowAble(updateContentLength)
        }
    })
    $('.contentBtnLeft').on('click',()=>{
        if($('.allBtn').hasClass('choice')){
            contetnLeftMove(contentLength)
            arrowAble(contentLength)
        }
        else if($('.contentClickMenu button:not(.allBtn)')){
            let updateContentLength = 4
            contetnLeftMove(updateContentLength)
            arrowAble(updateContentLength);
        }
    })


    // footer
    let footerNumber = true
    $('.siteMap').on('click',()=>{
        if(footerNumber === true){
            $('.siteMap').addClass('on')
            footerNumber = false
        }
        else {
            $('.siteMap').removeClass('on')
            footerNumber = true
        }
    })


})