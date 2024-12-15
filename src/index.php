<?php
    include './model/connect.php';
    include 'model/employee.php';
    echo '<h1>DANH SACH NHAN VIEN</h1> ';
    echo '<br>';
    connectdb();

?>


<html>
<head>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // if (isset($_POST["insert"])) {
        //     $maNV = $_POST['maNV'];
        
        //     if ($maNV !== "") {
        //         insert($maNV)
        //         header("location: /phpWeb/home.php")
        //         // Insert logic here
        //     } else {
                // echo "<script type='text/javascript'>alert('Có thuộc tính bị trống.');</script>";
        //     }
        // }
        if (isset($_POST['insert'])) {

            // Insert logic here
            $maNV = $_POST['maNV'];
            $hoNV = $_POST['hoNV'];
            $tenNV = $_POST['tenNV'];
            $viTri = $_POST['viTri'];
            $chucVu = $_POST['chucVu'];
            $chiNhanh = $_POST['chiNhanh'];
            $gioiTinh = $_POST['gioiTinh'];
            $ngaySinh = $_POST['ngaySinh'];
            $soDT = $_POST['soDT'];
            $email = $_POST['email'];
            $trangThai = $_POST['trangThai'];
            $loaiHinhHD = $_POST['loaiHinhHD'];
            $ngayLam = $_POST['ngayLam'];
            $loaiHD = $_POST['loaiHD'];
            $luong = $_POST['luong'];
            $diaChi = $_POST['diaChi'];
            $hocVan = $_POST['hocVan'];
            $soCC = $_POST['soCC'];
            if ($maNV !== "" &&
                $hoNV !== "" &&
                $tenNV !== "" &&
                $viTri !== "" &&
                $chucVu !== "" &&
                $chiNhanh !== "" &&
                $gioiTinh !== "" &&
                $ngaySinh !== "" &&
                $soDT !== "" &&
                $email !== "" &&
                $trangThai !== "" &&
                $loaiHinhHD !== "" &&
                $ngayLam !== "" &&
                $loaiHD !== "" &&
                $luong !== "" &&
                $diaChi !== "" &&
                $hocVan !== "" &&
                $soCC !== "") 
                {
                // Insert logic here
                insert($maNV, $hoNV, $tenNV, $viTri,
                $chucVu, $chiNhanh, $gioiTinh, $ngaySinh,
                $soDT, $email, $trangThai, $loaiHinhHD, $ngayLam,
                $loaiHD, $luong, $diachi, $hocvan, $soCC);

                header("location: /phpWeb/home.php");
            } else {
                // Handle empty fields
                echo "<script type='text/javascript'>alert('Có thuộc tính bị trống.');</script>";

            }
        }
    }
    ?>
<form action="" method="post">
    <label for="maNV">Mã NV:</label>
    <input type="text" id="maNV" name="maNV">&nbsp;

    <label for="hoNV">Họ NV:</label>
    <input type="text" id="hoNV" name="hoNV">&nbsp;

    <label for="tenNV">Tên NV:</label>
    <input type="text" id="tenNV" name="tenNV">&nbsp;

    <label for="viTri">Vị Trí:</label>
    <input type="text" id="viTri" name="viTri">&nbsp;

    <label for="chucVu">Chức Vụ:</label>
    <input type="text" id="chucVu" name="chucVu">&nbsp;

    <label for="chiNhanh">Chi Nhánh:</label>
    <input type="text" id="chiNhanh" name="chiNhanh">&nbsp;<br><br>

    <label for="gioiTinh">Giới Tính:</label>
    <input type="text" id="gioiTinh" name="gioiTinh">&nbsp;

    <label for="ngaySinh">Ngày Sinh:</label>
    <input type="date" id="ngaySinh" name="ngaySinh">&nbsp;

    <label for="soDT">Số ĐT:</label>
    <input type="text" id="soDT" name="soDT">&nbsp;

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">&nbsp;<br><br>

    <label for="trangThai">Trạng Thái:</label>
    <input type="text" id="trangThai" name="trangThai">&nbsp;

    <label for="loaiHinhHD">Loại Hình HĐ:</label>
    <input type="text" id="loaiHinhHD" name="loaiHinhHD">&nbsp;

    <label for="ngayLam">Ngày Làm:</label>
    <input type="date" id="ngayLam" name="ngayLam">&nbsp;

    <label for="loaiHD">Loại HĐ:</label>
    <input type="text" id="loaiHD" name="loaiHD">&nbsp;<br><br>

    <label for="luong">Lương:</label>
    <input type="text" id="luong" name="luong">&nbsp;

    <label for="diaChi">Địa chỉ:</label>
    <input type="text" id="diaChi" name="diaChi">&nbsp;

    <label for="hocVan">Học vấn:</label>
    <input type="text" id="hocVan" name="hocVan">&nbsp;

    <label for="soCC">Số CC:</label>
    <input type="text" id="soCC" name="soCC">&nbsp;<br><br>

    <input type="submit" name="insert" value="Insert">
</form>




<table>
<tr>
<th>ThaoTac</th>
<!-- <th>MaNV</th>
<th>MaNV</th> -->
<th>MaNV</th>
<th>HoNV</th>
<th>TenNV</th>
<th>ViTri</th>
<th>ChuVu</th>
<th>ChiNhanh</th>
<th>GioiTinh</th>
<th>NgaySinh</th>
<th>SoDT</th>
<th>Email</th>
<th>TrangThai</th>
<th>LoaiHinhHD</th>
<th>NgayLam</th>
<th>LoaiHD</th>
<th>Long</th>
<th>DiaChi</th>
<th>HocVan</th>
<th>SoCC</th>
</tr>

<?php
$var = load();
//var_dump($var);
if(isset($var)&&(count($var)>1))
{
foreach($var as $item)
{
echo '<tr>
<th><a href="#">Edit</a>|<a href="#">Del</a></th>
<th>'.$item['MaNV'].'</th>

<th>'.$item['HoNV'].'</th>
<th>'.$item['TenNV'].'</th>
<th>'.$item['ViTri'].'</th>
<th>'.$item['ChuVu'].'</th>
<th>'.$item['ChiNhanh'].'</th>
<th>'.$item['GioiTinh'].'</th>
<th>'.$item['NgaySinh'].'</th>
<th>'.$item['SoDT'].'</th>
<th>'.$item['Email'].'</th>
<th>'.$item['TrangThai'].'</th>
<th>'.$item['LoaiHinhHD'].'</th>
<th>'.$item['Ngaylam'].'</th>
<th>'.$item['LoaiHD'].'</th>
<th>'.$item['Luong'].'</th>
<th>'.$item['DiaChi'].'</th>
<th>'.$item['HocVan'].'</th>
<th>'.$item['SoCC'].'</th>
</tr>';
}
}
?>


</table>
</body>
</html>


    