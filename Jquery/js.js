// 1. Khởi tạo dữ liệu ban đầu
const initialData = [
    { studentId: "SV001", studentName: "Nguyễn Văn A", age: 20, sex: true, birthDate: "2002-04-23", birthPlace: "HN", address: "25, Vũ Ngọc Phan" },
    { studentId: "SV002", studentName: "Nguyễn Văn B", age: 21, sex: false, birthDate: "2001-09-09", birthPlace: "ĐN", address: "1, Ngô Quyền" },
    { studentId: "SV003", studentName: "Nguyễn Văn C", age: 19, sex: true, birthDate: "2003-07-07", birthPlace: "HCM", address: "1, Lý Tự Trọng" },
    { studentId: "SV004", studentName: "Nguyễn Văn D", age: 29, sex: false, birthDate: "2005-07-07", birthPlace: "HCM", address: "1, Lý Tự Trọng" }
];

let action = "add"; // Biến lưu trạng thái form: 'add' hoặc 'edit'

// Hàm lấy dữ liệu từ localStorage
function getStudents() {
    const students = localStorage.getItem('students');
    if (!students) {
        localStorage.setItem('students', JSON.stringify(initialData));
        return initialData;
    }
    return JSON.parse(students);
}

// 2. Render dữ liệu ra bảng
function renderTable(data = getStudents()) {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = ""; 

    data.forEach((student, index) => {
        // sex: true -> Nam, false -> Nữ
        const gender = student.sex === true || student.sex === "true" ? "Nam" : "Nữ";
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.studentId}</td>
            <td>${student.studentName}</td>
            <td>${student.age}</td>
            <td>${gender}</td>
            <td>
                <button class="btn btn-view" onclick="viewStudent('${student.studentId}')">Xem</button>
                <button class="btn btn-edit" onclick="editStudent('${student.studentId}')">Sửa</button>
                <button class="btn btn-delete" onclick="deleteStudent('${student.studentId}')">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 3. Xử lý lưu thông tin (Thêm hoặc Cập nhật)
function saveStudent() {
    // Lấy thông tin từ form
    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const birthDate = document.getElementById("birthDate").value;
    const birthPlace = document.getElementById("birthPlace").value.trim();
    const address = document.getElementById("address").value.trim();

    // Validation cơ bản
    if (!id || !name || !age) {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
        return;
    }

    let students = getStudents();

    if (action === "add") {
        // Kiểm tra trùng ID
        if (students.find(s => s.studentId === id)) {
            alert("Mã sinh viên đã tồn tại!");
            return;
        }
        students.push({ studentId: id, studentName: name, age, sex, birthDate, birthPlace, address });
    } else if (action === "edit") {
        const index = students.findIndex(s => s.studentId === id);
        if (index !== -1) {
            students[index] = { studentId: id, studentName: name, age, sex, birthDate, birthPlace, address };
        }
    }

    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").disabled = false; // Mở khóa input ID
    action = "add";
}

// 4. Các hàm chức năng (Xem, Sửa, Xóa)
function viewStudent(id) {
    const student = getStudents().find(s => s.studentId === id);
    if (student) {
        fillForm(student);
        // Có thể disable các trường đi để chỉ xem
    }
}

function editStudent(id) {
    const student = getStudents().find(s => s.studentId === id);
    if (student) {
        fillForm(student);
        document.getElementById("studentId").disabled = true; // Không cho phép sửa Mã SV
        action = "edit";
    }
}

function deleteStudent(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
        let students = getStudents();
        students = students.filter(s => s.studentId !== id);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
}

function fillForm(student) {
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("studentName").value = student.studentName;
    document.getElementById("age").value = student.age;
    document.getElementById("sex").value = student.sex;
    document.getElementById("birthDate").value = student.birthDate;
    document.getElementById("birthPlace").value = student.birthPlace;
    document.getElementById("address").value = student.address;
}

function openForm(mode) {
    action = mode;
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").disabled = false;
}

// Hàm khởi chạy lần đầu
renderTable();