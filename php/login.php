<?php
	//1.拿到前端传来的数据
	$uname = $_POST['username'];
	$upass = $_POST['password'];
	//2.去数据库查询是否包含了这个数据
	//2-1 建立数据库的连接
	$link=mysqli_connect('localhost','root','root','test');
	//2-2 执行查询语句
	$sql = "SELECT * FROM `users` WHERE `username`='$uname' AND `password`='$upass'";
	$res=mysqli_query($link,$sql);
	//2-3 解析查询结果,这个结果是php格式的数据，要转换成json数据传输出去
	$row = mysqli_fetch_assoc($res);
	//2-4 断开连接
	mysqli_close($link);

	if($row){
		$arr = array("message" => "登录成功", "code" => 1);//给关联性数组（即对象）自定义两个属性
	}else{
		$arr = array("message" => "登录失败", "code" => 0);
	};
	//将查询到的结果通过json数据的形式传出去
	print_r(json_encode($arr));
	
?>