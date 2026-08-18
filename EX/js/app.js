// =====================================================================
// 1. DỮ LIỆU BAN ĐẦU (DATA)
// =====================================================================
let products = [
    { productId: "SP001", productName: "Laptop Dell Inspiron 15", quantity: 10, price: 18500000, image: "images/dell-inspiron.jpg", status: true },
    { productId: "SP002", productName: "Laptop HP Pavilion 14", quantity: 8, price: 16900000, image: "images/hp-pavilion.jpg", status: true },
    { productId: "SP003", productName: "Chuột Logitech M331", quantity: 25, price: 450000, image: "images/logitech-m331.jpg", status: true },
    { productId: "SP004", productName: "Bàn phím cơ DareU EK87", quantity: 15, price: 890000, image: "images/dareu-ek87.jpg", status: true },
    { productId: "SP005", productName: "Tai nghe Sony WH-CH520", quantity: 5, price: 1290000, image: "images/sony-wh-ch520.jpg", status: false }
];

// =====================================================================
// 2. CÁC HÀM HIỂN THỊ (RENDER)
// =====================================================================
const fn_renderProducts = (data) => {
    $(".list table tbody").empty();
    
    data.forEach((product, index) => {
        let trangThai = product.status ? "<span style='color:green;font-weight:bold'>Còn hàng</span>" : "<span style='color:red;'>Hết hàng</span>";
        let giaTien = product.price.toLocaleString('vi-VN') + " đ";

        let row = `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.image}" alt="${product.productName}" class="img-preview" onerror="this.src='https://via.placeholder.com/50'"></td>
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.quantity}</td>
                <td>${giaTien}</td>
                <td>${trangThai}</td>
                <td>
                    <button class="btn btn-xem" onclick="fn_showProduct('${product.productId}')">Xem</button>
                    <button class="btn btn-sua" onclick="fn_editProduct('${product.productId}')">Sửa</button>
                    <button class="btn btn-xoa" onclick="fn_deleteProduct('${product.productId}')">Xóa</button>
                </td>
            </tr>
        `;
        $(".list table tbody").append(row);
    });
}

// =====================================================================
// 3. CÁC HÀM XỬ LÝ (CRUD FUNCTIONS)
// =====================================================================

const fn_resetForm = () => {
    $("#productId").val('').prop("disabled", false);
    $("#productName").val('');
    $("#quantity").val('');
    $("#price").val('');
    $("#image").val('');
    $("#status").val('true');

    $("#btnAction").attr("data-val", "2").text("Ghi lại").css("background", "green"); 
}

const fn_showProduct = (id) => {
    let product = products.find(item => item.productId === id);
    if (!product) return;

    $("#productId").val(product.productId).prop("disabled", true);
    $("#productName").val(product.productName);
    $("#quantity").val(product.quantity);
    $("#price").val(product.price);
    $("#image").val(product.image);
    $("#status").val(product.status.toString());

    // Thêm class open để kích hoạt CSS Transition
    $('.box-left').addClass("open");
    $('.box-right').addClass("open");
    
    $("#btnAction").attr("data-val", "0").text("Đóng").css("background", "#6c757d"); 
}

const fn_editProduct = (id) => {
    fn_showProduct(id);
    $("#btnAction").attr("data-val", "1").text("Cập nhật").css("background", "#ffc107"); 
}

const fn_saveProduct = (product) => {
    let exists = products.some(item => item.productId === product.productId);
    if (exists) {
        alert("Mã sản phẩm " + product.productId + " đã tồn tại!");
        return;
    }
    
    products.push(product);
    fn_renderProducts(products);
    alert("Thêm mới thành công!");
    fn_resetForm();
}

const fn_updateProduct = (product) => {
    let index = products.findIndex(item => item.productId === product.productId);
    if (index === -1) return;

    products[index] = product;
    fn_renderProducts(products);
    alert("Cập nhật thành công!");
}

const fn_deleteProduct = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?") === false) return;
    products = products.filter(item => item.productId !== id);
    fn_renderProducts(products);
};

// =====================================================================
// 4. BẮT SỰ KIỆN KHI TRANG TẢI XONG (DOCUMENT READY)
// =====================================================================
$(document).ready(() => {
    
    fn_renderProducts(products);

    // Mở form thêm mới
    $('.btn-add').click(() => {
        $('.box-left').addClass("open");
        $('.box-right').addClass("open");
        fn_resetForm();
    });

    // Sự kiện nút Form
    $("#btnAction").click((event) => {
        event.preventDefault();

        let actionVal = $("#btnAction").attr("data-val");

        // Đóng form
        if (actionVal === "0") {
             $('.box-left').removeClass("open"); 
             $('.box-right').removeClass("open");        
             return; 
        }

        let productData = {
            productId: $("#productId").val().trim(),
            productName: $("#productName").val().trim(),
            quantity: Number($("#quantity").val()),
            price: Number($("#price").val()),
            image: $("#image").val().trim(),
            status: $("#status").val() === "true"
        };

        if (!productData.productId || !productData.productName) {
            alert("Vui lòng nhập ít nhất Mã và Tên sản phẩm!");
            return;
        }

        if (actionVal === "1") {
            fn_updateProduct(productData);
        }

        if (actionVal === "2") {
            fn_saveProduct(productData);
        }
    });

});