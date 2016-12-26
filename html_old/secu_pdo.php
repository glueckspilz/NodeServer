<?php
class SecuPDO {

   protected static $_instance = null;

	public static function Init($host,$dbname,$username,$password)
	{
		$str = "mysql:host=" . $host . ";" . "dbname=" . $dbname;
		self::$_instance = new PDO($str,$username,$password);
	}
	
   public static function GetInstance()
   {
       if (null === self::$_instance)
       {
           self::$_instance = new self;
       }
       
       return self::$_instance;
   }
 
   protected function __clone() {}
   
   protected function __construct() {}
 
 }
 SecuPDO::Init("localhost","secumod","dacaibrah","Ibrahim99");
 ?>