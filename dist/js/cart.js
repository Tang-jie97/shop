"use strict";var cartList=JSON.parse(localStorage.getItem("cartList"));function bindHtml(){var c=cartList.every(function(c){return!0===c.isSelect}),t='\n    <div class="goods-head">\n        <div class="col col-check">\n            <input type="checkbox" style="zoom: 180%;" class="selectAll" '.concat(c?"checked":"",'>全选\n        </div>\n        <div class="col col-img">&nbsp;</div>\n        <div class="col col-name">商品名称</div>\n        <div class="col col-price">单价</div>\n        <div class="col col-num">数量</div>\n        <div class="col col-total">小计</div>\n    <div class="col col-action">操作</div>\n    </div>\n    <div class="goods-body">\n    ');cartList.forEach(function(c){t+='\n        <div class="item-box">\n            <div class="col col-check">\n                <input class="selectOne" data-id='.concat(c.id,' type="checkbox" style="zoom: 180%;"  ').concat(c.isSelect?"checked":"",'>\n            </div>\n            <div class="col col-img"><img src="').concat(c.url,'" alt=""></div>\n            <div class="col col-name">').concat(c.name,'</div>\n            <div class="col col-price">').concat(c.price,'</div>\n            <div class="col col-num">\n                <button class="sub"  data-id=').concat(c.id,'>-</button>\n                <input type="text" value="').concat(c.number,'">\n                <button class="add" data-id=').concat(c.id,'>+</button>\n            </div>\n            <div class="col col-total">').concat(parseFloat(c.xiaoji).toFixed(2),'元</div>\n            <div class="col col-action del" data-id=').concat(c.id,">删除</div>\n        </div>\n                ")});var i=cartList.filter(function(c){return c.isSelect}),n=0,a=0;i.forEach(function(c){n+=c.number,a+=parseFloat(c.xiaoji)}),t+='\n    </div>\n        <div class="bar">\n            <div class="bar-left">\n                <a href="../pages/list.html">继续购物</a>\n                <span>已选择<i>'.concat(n,'</i>件</span>\n            </div>\n            <span class="price">合计:<em>').concat(parseFloat(a).toFixed(2),'</em>元</span>\n            <a href="" class="pay-btn"  ').concat(i.length?"":"disabled",">去结算</a>\n        </div>\n    "),$(".goods-list").html(t)}function bindEvent(){$(".goods-list").on("change",".selectAll",function(){var t=this;cartList.forEach(function(c){c.isSelect=t.checked}),bindHtml(),localStorage.setItem("cartList",JSON.stringify(cartList))}),$(".goods-list").on("change",".selectOne",function(){var t=$(this).data("id");cartList.forEach(function(c){c.id===t&&(c.isSelect=!c.isSelect)}),bindHtml(),localStorage.setItem("cartList",JSON.stringify(cartList))}),$(".goods-list").on("click",".sub",function(){var t=$(this).data("id");cartList.forEach(function(c){c.id===t&&(1<c.number&&c.number--,c.xiaoji=c.price*c.number)}),bindHtml(),localStorage.setItem("cartList",JSON.stringify(cartList))}),$(".goods-list").on("click",".add",function(){var t=$(this).data("id");cartList.forEach(function(c){c.id===t&&(c.number++,c.xiaoji=c.number*c.price)}),bindHtml(),localStorage.setItem("cartList",JSON.stringify(cartList))}),$("..goods-list").on("click",".del",function(){var c=$(this).data("id");console.log("把数组中 id 为 : "+c+" 的数去去掉, 从新渲染页面, 从新存储到 lcoalStorage")}),$(".cart").on("click",".clear",function(){console.log("把数组清空"),console.log("从新渲染页面"),console.log("把空数组从新存储到 lcoalStorage 里面")})}cartList?(bindHtml(),bindEvent()):alert("您的购物车为空, 快去选购把");