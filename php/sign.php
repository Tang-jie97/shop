<?php
	$uname = $_POST['username'];
	$upass = $_POST['password'];
	//2.去数据库查询是否包含了这个数据
	//2-1 建立数据库的连接
	$link=mysqli_connect('localhost','root','root','test');
	//2-2 执行查询语句
	$sql = "SELECT * FROM `users` WHERE `username`='$uname'";
	$res=mysqli_query($link,$sql);
	//2-3 解析查询结果
	$row = mysqli_fetch_assoc($res);
	//2-4 断开连接
	mysqli_close($link);
	
	//判断数据库是否含有这个数据，如果有，数据返回，如果没有，将数据添加到数据库
	if($row){
		$arr = array("message" => "该账号已经被注册", "code" => 0);
	}else{
		//1.
		$link=mysqli_connect('localhost','root','root','test');
		//2.
		$res2=mysqli_query($link,"INSERT INTO `users`(`username`,`password`)VALUES('$uname','$upass')");
		if($res2){
			$arr = array("message" => "注册成功", "code" => 1);
		}
		mysqli_close($link);
	};
	print_r(json_encode($arr));
?>