const cartList = JSON.parse(localStorage.getItem('cartList'))
if (!cartList) {
    alert('您的购物车为空, 快去选购把')
} else {
    // 3. 渲染页面
    bindHtml()
        // 4. 添加各种事件
    bindEvent()
}

function bindHtml() {
    let selectAll = cartList.every(item => {
        return item.isSelect === true
    })

    let str = `
    <div class="goods-head">
        <div class="col col-check">
            <input type="checkbox" style="zoom: 180%;" class="selectAll" ${ selectAll ? 'checked' : '' }>全选
        </div>
        <div class="col col-img">&nbsp;</div>
        <div class="col col-name">商品名称</div>
        <div class="col col-price">单价</div>
        <div class="col col-num">数量</div>
        <div class="col col-total">小计</div>
    <div class="col col-action">操作</div>
    </div>
    <div class="goods-body">
    `

    cartList.forEach(item => {
        // 每一条数据的渲染, 根据每一条信息来渲染页面
        str += `
        <div class="item-box">
            <div class="col col-check">
                <input class="selectOne" data-id=${ item.id } type="checkbox" style="zoom: 180%;"  ${ item.isSelect ? 'checked' : '' }>
            </div>
            <div class="col col-img"><img src="${ item.url }" alt=""></div>
            <div class="col col-name">${ item.name }</div>
            <div class="col col-price">${ item.price }</div>
            <div class="col col-num">
                <button class="sub"  data-id=${ item.id }>-</button>
                <input type="text" value="${ item.number }">
                <button class="add" data-id=${ item.id }>+</button>
            </div>
            <div class="col col-total">${parseFloat(item.xiaoji).toFixed(2)}元</div>
            <div class="col col-action del" data-id=${ item.id }>删除</div>
        </div>
                `
    })
    let selectArr = cartList.filter(item => item.isSelect)
    let selectNumber = 0
        // 选中商品总价
    let selectPrice = 0
    selectArr.forEach(item => {
        selectNumber += item.number
        selectPrice += parseFloat(item.xiaoji)
    })

    str += `
    </div>
        <div class="bar">
            <div class="bar-left">
                <a href="../pages/list.html">继续购物</a>
                <span>已选择<i>${ selectNumber }</i>件</span>
            </div>
            <span class="price">合计:<em>${ parseFloat(selectPrice).toFixed(2) }</em>元</span>
            <a href="" class="pay-btn"  ${ selectArr.length ? '' : 'disabled'}>去结算</a>
        </div>
    `

    // 整体添加到页面的盒子里面
    $('.goods-list').html(str)
}

function bindEvent() {
    // 4-1. 全选按钮的事件
    $('.goods-list').on('change', '.selectAll', function() {
        cartList.forEach(item => {
            item.isSelect = this.checked
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 4-2. 单选按钮的事件
    $('.goods-list').on('change', '.selectOne', function() {
        const id = $(this).data('id')
        cartList.forEach(item => {
            if (item.id === id) {
                item.isSelect = !item.isSelect
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 4-3. 减少商品数量的事件
    $('.goods-list').on('click', '.sub', function() {
        const id = $(this).data('id')
            // 循环数组, 把 id 对应的这个数据的 number 和 小计修改了
        cartList.forEach(item => {
            if (item.id === id) {
                // 当 item.number === 1 的时候, 不需要 --
                item.number > 1 ? item.number-- : ''
                item.xiaoji = item.price * item.number
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 4-4. 添加商品按钮的事件
    $('.goods-list').on('click', '.add', function() {
        // 拿到自己身上存储的 id
        const id = $(this).data('id')
        cartList.forEach(item => {
            if (item.id === id) {
                item.number++
                    item.xiaoji = item.number * item.price
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 4-5. 点击删除的事件
    $('..goods-list').on('click', '.del', function() {
        // 拿到自己身上的 id
        const id = $(this).data('id')

        console.log('把数组中 id 为 : ' + id + ' 的数去去掉, 从新渲染页面, 从新存储到 lcoalStorage')
    })
    $('.cart').on('click', '.clear', function() {
        console.log('把数组清空')
        console.log('从新渲染页面')
        console.log('把空数组从新存储到 lcoalStorage 里面')
    })
}