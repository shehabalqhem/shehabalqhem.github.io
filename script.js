const products=[
{id:1,name:"حقيبة عصرية",price:35000,img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",desc:"حقيبة أنيقة للاستخدام اليومي."},
{id:2,name:"ساعة أنيقة",price:28000,img:"https://images.unsplash.com/photo-1524805444758-089113d48a75?auto=format&fit=crop&w=700&q=85",desc:"تصميم بسيط وأنيق."},
{id:3,name:"حذاء رياضي",price:42000,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",desc:"راحة وأناقة للاستخدام اليومي."},
{id:4,name:"سماعات لاسلكية",price:55000,img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",desc:"صوت واضح وتصميم مريح."},
{id:5,name:"نظارة شمسية",price:22000,img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",desc:"إطلالة عصرية مميزة."},
{id:6,name:"محفظة جلدية",price:18000,img:"https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85",desc:"عملية وأنيقة."}
];
let cart=JSON.parse(localStorage.getItem("shehab_cart")||"[]");
const money=n=>new Intl.NumberFormat("ar-YE").format(n)+" ر.ي";
const $=id=>document.getElementById(id);
function save(){localStorage.setItem("shehab_cart",JSON.stringify(cart));renderCart()}
function renderProducts(){$("productsGrid").innerHTML=products.map(p=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="btn" onclick="add(${p.id})">أضف إلى السلة</button></div></article>`).join("")}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function change(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<1)cart=cart.filter(i=>i.id!==id);save()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save()}
function renderCart(){let total=0,count=0;cart.forEach(i=>{count+=i.qty;let p=products.find(x=>x.id===i.id);if(p)total+=p.price*i.qty});$("count").textContent=count;$("total").textContent=money(total);$("modalTotal").textContent=money(total);
$("cartItems").innerHTML=cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);return `<div class="item"><img src="${p.img}" alt=""><div><b>${p.name}</b><div>${money(p.price)}</div><div class="qty"><button onclick="change(${p.id},-1)">−</button>${i.qty}<button onclick="change(${p.id},1)">+</button></div></div><button class="remove" onclick="removeItem(${p.id})">حذف</button></div>`}).join(""):'<p style="text-align:center;color:#777">السلة فارغة.</p>'}
function openCart(){$("drawer").classList.add("open");$("shade").classList.add("show")}
function closeCart(){$("drawer").classList.remove("open");$("shade").classList.remove("show")}
$("cartOpen").onclick=openCart;$("cartClose").onclick=closeCart;$("shade").onclick=closeCart;
$("menu").onclick=()=>$("navlinks").classList.toggle("open");
$("checkout").onclick=()=>{if(!cart.length)return;closeCart();$("modal").classList.add("show");$("orderMsg").textContent=""};
$("modalClose").onclick=()=>$("modal").classList.remove("show");
$("orderForm").onsubmit=e=>{e.preventDefault();if(!cart.length)return;let fd=new FormData(e.target),total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0),orders=JSON.parse(localStorage.getItem("shehab_orders")||"[]");orders.unshift({id:Date.now().toString().slice(-7),date:new Date().toLocaleString("ar-YE"),name:fd.get("name"),phone:fd.get("phone"),address:fd.get("address"),notes:fd.get("notes"),items:cart,total});localStorage.setItem("shehab_orders",JSON.stringify(orders));cart=[];save();e.target.reset();$("orderMsg").textContent="تم حفظ الطلب بنجاح على هذا الجهاز.";setTimeout(()=>$("modal").classList.remove("show"),1800)}
$("contactForm").onsubmit=e=>{e.preventDefault();$("contactMsg").textContent="تم استلام رسالتك. شكرًا لتواصلك معنا!";e.target.reset()};
$("year").textContent=new Date().getFullYear();renderProducts();renderCart();