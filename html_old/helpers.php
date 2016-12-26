<?php
	class HTML_Table
	{
		public $_array = array();
		public $_rowcount = 0;
		
		public function __construct($array)
		{
			$this->_rowcount = 0;
			$this->_array = array();
			
			if(is_array($array[0])){
				foreach($array as $key => $value)
				{
					$this->_array[$this->_rowcount++]= $value; 
				}
			}else 
			{
				$this->_array[$this->_rowcount++]= $array;				
			}

		}
		
		public function addRow($array)
		{
			$this->_array[$this->_rowcount++]= $array;
		}

		public function createTable()
		{
			
			echo "<table>";
		
			foreach($this->_array as $key => $value)
			{
				echo "<tr>";
				
				foreach($value as $k => $v)
				{
					echo "<th>".$k."</th>";
				
				}
				echo "</tr>";
				echo "<tr>";
				foreach($value as $k => $v)
				{
					
					echo "<td>".$v."</td>";
				}
				echo "</tr>";
			}	
			
			echo "</table>";
		}
	
	}		

?>