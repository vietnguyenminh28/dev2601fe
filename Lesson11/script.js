// ==================================================
// DỮ LIỆU & HÀM DÙNG CHUNG
// ==================================================
const initialData = [
    { studentId: "SV001", studentName: "Nguyễn Văn A", age: 20, sex: "true", birthDate: "2002-04-23", birthPlace: "HN", address: "25, Vũ Ngọc Phan" },
    { studentId: "SV002", studentName: "Nguyễn Văn B", age: 21, sex: "false", birthDate: "2001-09-09", birthPlace: "ĐN", address: "1, Ngô Quyền" },
    { studentId: "SV003", studentName: "Nguyễn Văn C", age: 19, sex: true, birthDate: "2003-07-07", birthPlace: "HCM", address: "1, Lý Tự Trọng" },
    { studentId: "SV004", studentName: "Nguyễn Văn D", age: 29, sex: false, birthDate: "2005-07-07", birthPlace: "HCM", address: "1, Lý Tự Trọng" },
];

// Lấy danh sách từ bộ nhớ
function getStudents() {
    let data = localStorage.getItem('students');
    return data ? JSON.parse(data) : initialData;
}

// Lưu danh sách vào bộ nhớ
function setStudents(data) {
    localStorage.setItem('students', JSON.stringify(data));
}

// Gom dữ liệu người dùng nhập từ Form thành 1 đối tượng
function getFormData() {
    return {
        studentId: $("#studentId").val().trim(),
        studentName: $("#studentName").val().trim(),
        age: Number($("#age").val()),
        sex: $("#sex").val(),
        birthDate: $("#birthDate").val(),
        birthPlace: $("#birthPlace").val().trim(),
        address: $("#address").val().trim()
    };
}


// ==================================================
// CHỨC NĂNG 1: HIỂN THỊ DANH SÁCH (READ)
// ==================================================
function renderTable(data = getStudents()) {
    const $tbody = $("#studentTableBody").empty();
    
    data.forEach((st, i) => {
        let gender = (st.sex === "true" || st.sex === true) ? "Nam" : "Nữ";
        $tbody.append(`
            <tr>
                <td>${i + 1}</td>
                <td>${st.studentId}</td>
                <td>${st.studentName}</td>
                <td>${st.age}</td>
                <td>${gender}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-view" onclick="viewStudent('${st.studentId}')">Xem</button>
                        <button class="btn btn-edit" onclick="openEditForm('${st.studentId}')">Sửa</button>
                        <button class="btn btn-delete" onclick="deleteStudent('${st.studentId}')">Xóa</button>
                    </div>
                </td>
            </tr>
        `);
    });
}

function openAddForm() {
    $("#studentForm")[0].reset();
    $("#studentId").prop("disabled", false); // Cho phép nhập Mã
    
    // Đổi nút lưu thành lệnh Thêm
    $("#btnSave").text('Thêm Sinh Viên').attr('onclick', 'addStudent()');
    $("#formPanel").show();
}

function addStudent() {
    let newStudent = getFormData();
    
    if (!newStudent.studentId || !newStudent.studentName || !newStudent.age) {
        return alert("Vui lòng nhập đủ Mã, Tên và Tuổi!");
    }

    let students = getStudents();
    // Dò xem mã SV đã có ai dùng chưa
    if (students.find(s => s.studentId === newStudent.studentId)) {
        return alert("Mã SV đã tồn tại!");
    }

    students.push(newStudent);
    setStudents(students);
    renderTable();
    $("#formPanel").hide(); // Ẩn form
}
function openEditForm(id) {
    let st = getStudents().find(s => s.studentId === id);
    if (!st) return;

    $("#studentId").val(st.studentId).prop("disabled", true); // Khóa không cho sửa Mã SV
    $("#studentName").val(st.studentName);
    $("#age").val(st.age);
    $("#sex").val(st.sex);
    $("#birthDate").val(st.birthDate);
    $("#birthPlace").val(st.birthPlace);
    $("#address").val(st.address);

    // Đổi nút lưu thành lệnh Cập nhật, truyền thẳng ID vào lệnh
    $("#btnSave").text('Cập Nhật').attr('onclick', `updateStudent('${id}')`);
    $("#formPanel").show();
}

// Bước 3.2: Xử lý lưu đè thông tin mới
function updateStudent(id) {
    let updatedData = getFormData();
    
    if (!updatedData.studentName || !updatedData.age) {
        return alert("Vui lòng nhập đủ Tên và Tuổi!");
    }
    
    updatedData.studentId = id; // Bắt buộc giữ lại ID cũ dù form có bị sao đó

    let students = getStudents();
    let index = students.findIndex(s => s.studentId === id);
    students[index] = updatedData; // Ghi đè người cũ bằng data mới

    setStudents(students);
    renderTable();
    $("#formPanel").hide(); // Ẩn form
}
// CHỨC NĂNG 4: XÓA (DELETE)

function deleteStudent(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
        let students = getStudents();
        // Lọc lấy những người KHÁC với id bị xóa
        students = students.filter(s => s.studentId !== id); 
        
        setStudents(students);
        renderTable();
        
        // Đóng form nếu nó đang mở đúng hồ sơ bị xóa
        if ($("#studentId").val() === id) {
            $("#formPanel").hide();
        }
    }
}

// CHỨC NĂNG 5: XEM CHI TIẾT (VIEW)
function viewStudent(id) {
    let st = getStudents().find(s => s.studentId === id);
    if (!st) return;

    $("#studentId").val(st.studentId).prop("disabled", true);
    $("#studentName").val(st.studentName);
    $("#age").val(st.age);
    $("#sex").val(st.sex.toString());
    $("#birthDate").val(st.birthDate);
    $("#birthPlace").val(st.birthPlace);
    $("#address").val(st.address);

    $("#btnSave").text('Đóng Form').attr('onclick', 'closeForm()');
    $("#formPanel").show();
}

// CHỨC NĂNG 6: TÌM KIẾM & SẮP XẾP
function searchStudent() {
    let key = $("#searchInput").val().toLowerCase();
    let result = getStudents().filter(s => 
        s.studentName.toLowerCase().includes(key) || s.studentId.toLowerCase().includes(key)
    );
    renderTable(result);
}

function sortStudent() {
    let sort = $("#sortSelect").val();
    let students = getStudents();
    
    if (sort === "nameASC") students.sort((a, b) => a.studentName.localeCompare(b.studentName));
    if (sort === "nameDESC") students.sort((a, b) => b.studentName.localeCompare(a.studentName));
    
    renderTable(students);
}

// Ẩn form
function closeForm() {
    $("#formPanel").hide();
}
$(document).ready(function() {
    renderTable();
});