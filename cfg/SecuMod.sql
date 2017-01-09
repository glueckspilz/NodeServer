-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 08, 2017 at 12:38 PM
-- Server version: 5.7.16-0ubuntu0.16.10.1
-- PHP Version: 7.0.8-3ubuntu3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SecuMod`
--

-- --------------------------------------------------------

--
-- Table structure for table `Doors`
--

CREATE TABLE `Doors` (
  `DoorID` bigint(20) NOT NULL,
  `DoorName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Doors`
--

INSERT INTO `Doors` (`DoorID`, `DoorName`) VALUES
(1, 'DOOR_0815'),
(2, 'DOOR_1337'),
(3, 'DOOR_MAIN');

-- --------------------------------------------------------

--
-- Table structure for table `Door_Modules`
--

CREATE TABLE `Door_Modules` (
  `DoorID` bigint(20) NOT NULL,
  `ModuleID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Door_Modules`
--

INSERT INTO `Door_Modules` (`DoorID`, `ModuleID`) VALUES
(1, 3),
(3, 1),
(2, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Modules`
--

CREATE TABLE `Modules` (
  `ModuleID` bigint(20) NOT NULL,
  `ModuleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Modules`
--

INSERT INTO `Modules` (`ModuleID`, `ModuleName`) VALUES
(1, 'FingerPrint'),
(2, 'RFID'),
(3, 'KeyPad');

-- --------------------------------------------------------

--
-- Table structure for table `Privileges`
--

CREATE TABLE `Privileges` (
  `PrivilegeID` bigint(20) NOT NULL,
  `PrivilegeName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Privileges`
--

INSERT INTO `Privileges` (`PrivilegeID`, `PrivilegeName`) VALUES
(1, 'Admin'),
(2, 'DOOR_0815'),
(3, 'DOOR_1337'),
(5, 'asdfasdf');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` bigint(20) NOT NULL,
  `FirstName` varchar(256) NOT NULL,
  `LastName` varchar(256) NOT NULL,
  `EmailAddress` varchar(256) NOT NULL,
  `Username` varchar(256) NOT NULL,
  `Password` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `FirstName`, `LastName`, `EmailAddress`, `Username`, `Password`) VALUES
(1, 'genkinger', 'Genkinger', 'lukas.genkinger@gmail.com', 'genkinger', '10$$y0UWN5W3NmyuvskgasGScdTTijT5tp9rOyPcSDQrkbR2IUu0vcV64gaz52haXlHAIxqiourGNkZNA1lcsbKBCsGD+IcPbf3TAJCoJ/oSuDq3XzCgp8G8SZ39MXA0csG6U+H4XMW5yJXXSXjSBNrOv1PlZ+zzY9qDKBLftJW8pbo=$$xhl2f7XGnTcSEkEkKB1VphJjCC15kvGT4hAN2Jq8uBbzEl42e25RLJhClz9E8+anJYbHVb+u/j/xJ0AJXnNO7pu8g1aT3pmfydc5DQRAp5SgywKBxYyY4LC4Ngq5V0O0jx9WVR6eEsk5oNc7dVQtEWGrzD3jEPORms433qO9VvcJhdNdhBeW1fXdXoELxIMImEzNBLDQ5y/dHe3OFVOxVibYE6OCIOc4K59yWhUwaWe93BQUFqMSaBE2FnhBnzB+ewGnfzmbjWYd0K7AVyeXLeqq14dzqS0Hab/TaEzA9oerQ0YmbBH6EiD2gWg8PantZs5dbrlx51f7/k85bdfsveFUkGoUP36ee9k/oWw78dlJKZcdcq1v8EOQa84CU7vOLu0N+4JLjJnXXbLBklHm8RwFviZ1OShfosyGp0JCQPxy0lyIcx4HUfGbe0g4K17o9P/lkz5aD2cOsxtdp5rK9s03j6dUHFj799J/Wipnmz2bMJYg1+c2zr0KRkbQNFDAoLOwol7iJo6ewj2TMVv9CZ1Mf6sq2WKOIZ9kVCW3uHz6ZFSvyKL3+u7nYi2ulhZh0v8ARpoXLFJ9G7T4ZkgJzfn04JTU1YvcUbkA5XovHP9gJIZKDwxPdnLe2bbOEUExKlUbSRyVipzlR/cUXUXL5tKLGqExf7FSW+Izl2ZoFCE='),
(2, 'dacaibrah', 'Daca', 'dacaibrah@kg-fds.de', 'dacaibrah', '10$$VXjxr1wTTmqDboyM6Hhfd1qY2K6uWLGgzV7Gl3XxFho8tqN0pOm0x767oSWIcq56issN8mlbmVtBsjLXwu4+Uf7Fd6cqx7sbxF+y0SCiBQ0sLum3TJ3SkwjHvEleYP93/jhL0+RJkSDJ/IhfEwLCX/6Rc3ffPLDeprcixG8JFrQ=$$f34SZzzqxFNNUB3ieRPu7yqWObMF5FfY8SZTc0z4NjHe7bJqD8PU8J6iHY7UDyO7j1PIW9lGP8ERDgaDHUiN2/r15V+UKa/tGSSWIParbg1WnvMzuAHC88IMM6j89DxZEV5WByv03RoybrMCzOzlAaW+3l6Zpy0BSALD4dxBL7mr7jE9lzyKBLkMI1kFwL6JMm8se/fh3CiLeRs7L2yj0IQj2ZDVoaDEzrgKO94gi67IMeEmif3zjnmTHixo6fkb93uoA93N62szy2y3+OInPlVEoX1k/eOvxGQ15BJPPGpkGzGdqswMQuDGygcIdAVR0HqYgSMZT/uVySnLsOiZ4jENsdGX9Lmh0OVPhvSiSAcvPye6JY5XOI/vDaRceuYU3zm+waTCAE8ChpLvXjZDedNfAAWWPVutnnbmMVOI8uRemWoeEpI0YhshNX8zbftjxmc0L+jiQkTSqpaDUqO44WDkDTfHd7BUQaY2LwSIQXLSORI5k/37EfZF94qoYZ5m1BduB/rvpw3Hqg3INtX7fl2KWWUeYZqNjHrt62HQPEPqEW6I34DJdVNaTrh+pxODn3knzwDIrrRxmLdBRQ09JYGcrkHINodzcEv3VfKODUpDYCBpc3gLBq4oC+bByql6KiKg6dvbTM+BML18fkF8g7T9jBqUD/y9IwoEHRWFzkg='),
(11, 'baurhanna', 'Baur', 'baurhanna@kg-fds.de', 'baurhanna', '10$$Rvddv3smziCgtGMD0BXr4WukpiAtQiL4ZWUmm0UG2XrqbqCxkr9huOj0Z5EksFQho/1YxPmRON/JdYWKlLjHOdR8n3vFi0qPWq+T20K5Y6rdRvIo89qjoLAjjU/kVtJNTF4mz8H3i5P74vpTR2bzlNSUv0UppLgVkvc1abX+yow=$$MvfMFDvSYFbqKwUbTn4uUphrCKMbEY7MKPozWaCiNvLRsuSixlBkL2wWwGh8drIn+wX2neAdbXMrS2VGa9jR33QVSbNNp7D8CR32GhDneVmxne35TT4BPQfCeM4MwzIfzILX2INRdfu9RtmVXphd3j/vYXVsANXA1KdqQSX5T4j55tw/1HQr+go9ZC4aLbBSPLD1pIwbjEMQ1SaNLagE2CCEZfd5c1a3UJoz+Hgl5Zc5yiZrLlv6QQd8osf2xv8wRyZcK+uUGP4GE99gbMmEOsOd7/BPTCdjP1pxZS7LywMPqFSsKvneInaI2xjlRTGP5wKbssykzCdee0c6SGOyYaR91jrzeUxW2SGbhQYwawSgBUVGPJZsnHEIUUCU4N7GKcs2kNXeQefc8MyrP/BPXzxeQvYS96EDD3Cwbi2q5be7MI3MWHWgqPmR4IvWfodJRrd+SDbMvSfzoVHH31VZKNJRMtrYhs2dkNEkA+8TsLt8y2qXS8HuPZwEGiJv29O7gaMajmHxdlkk/ozkLJa2Ql1MjhBHMp82TGUthEZ5a99S8ubj8rxMZt0tKUSo6RL4jDGdxGNQTK4HazKLT8RR9BKRUHPnG5i190HOAWRuu0W84DXK6fhrULtAz9VjxeQ7sKfYoBsINbUoM02O/NL1KhcjhzX3SvRvjhbiAAziRic='),
(12, 'weigoldlu', 'Weigold', 'weigoldlu@kg-fds.de', 'weigoldlu', '10$$B4UghC3SF2BSewbEttamL7atjf8gaxfPu368lFe+wB9JTOp/knnsL3bQOHy0PIoAYMIWCQljD6QrtoTCLvIRZt8Yv6dBR1Z0aVqHjxAhRHQWdDg9XhRBOVn+esOOOmAdrhgdtYOXCMJtkmrkznD17M735UB10nczxvZstxKArEM=$$xTbteMZ2+K85OsQbRskbWf41lgktyOoVC7n2EnxZqDCyW2tXFtt2+waeP79qofzcRhZ/SxAc2a+SpqLVCF/un46MO+7lalYMca/Z1GcJ1f8+FkZAJA0pUIyO9OuP3NAsx7Z6V5fvOLwhRLkTh8FXFcgIhl0Kj0/BLLGOirTthY6E4NdWBdQrL53iWP2Olr/9YfvIN+VcrC7jLXYq5g7LCUPORwWnCSPcNI28cT4uik4hW7efI4lhLQh4uOfTVdxGkSrMYEtHBDwHZzW9qBbm5krY4FznBDJIk5dJQjZTQ4S/Il3kzjKoIuldPOWzltFlzR3m9eDFyeNaOU7l6Uq2E8gFk9oZcnXiUo+FrrPZ3IUOAGrSET1oNtic1ASFVkAgd9YyqNTHhQVmVYivG2iOyl9nAWDLvX4Toei/QksIyhmTSwrjvwY2a6JAx0IE9dOsGDkzj1meIhRbsqRbcjwUmxJeua9qODvYcSPL8KvjDvbMNTIR5SEtqNRh+U+YaQwuaQwQW2X5UIp0knVPUuLN1v1lGLqFhH21VBmYxGli07ZukWW+b8QgLeKgL1m01ArzaLLhvSqspGoT20/N9RCctOUTKTalUm3ybolhW1mDWYQd5Kl7zmuVeSbqT06iod4fkJLMU5MpfarEuAmIWwOQ62WNZP8thRDp7Bh8Vlrr0Ew='),
(13, 'Moyo1337', 'degger', 'yannug.decker@web.de', 'Moyo1337', '10$$w8XMBH+0dgFrrcUNoAGN2nO+xkIDNLglE7FkMgtiw0Ho0VIBDxiGZ9j96AvuwgGg9s+8EP3CdggxQwwIoOhiUzIM+r+8gW9tmy1jr8D/bj+RqnENuRdA9CTukWBjC6LC8sRsyx0Sq6QAHdK7ntdyz9uz0M79Hb7IsvRcAmdTxBs=$$3VX36or46MurL87oVZDNfo5EXmnIbStp9rN6aEeEDBURCG6Vmv2vhPUeTfyiR8GsPSMmYk/kfY4WDvNT04vWlU/Fldw32HoajXS7DkNoKwZhkkPRxGwePn50VzLZAzoKgYzaBEYaimfO/HMRcIZEH3Ptc7KChz6jrb66sngVzHXYdKurQyACWJ1HizJ70fyTC/P9AXotWt1jVGgr+vS2iuYfCStDpQEPKx6oK/OG9e6BYHR57TPlnRW8YwLQfpX7XjRoBUKf5Rdc19WfznZIVmIsNrnGGeDeed+2d0uLhH4YxURrUpwJ9z831EhsUlig2l38HF6nGeotmVv8E5BjfZDEXuXL6AGO9wFZrcDYX8IkRH2SgcdaNgFgyzvu81WW19t8ZR39m17aqRBioB97baKjJFkd56JOfclCMKmPtcRoO/5fxO4xwB2hULGCdNDm1MBoNg4/MgxKWCwVLrEvbyqs8O9s6gACUQRMFppOUXVIjyIGr8mD4UWGaGwMWQzFdC8CvGjeNxHFsEq0x6n3jkv0vzFMB4eZcJrNRsUlII3zHZuEaDXpUUsqHLPhKxQvfYACqd4QKoHvkCZiv0JHOVaNAXdYbmuFAvLmWwcNLzTgWW00GD9bj0lvv7Icp0w1JEOUeWMVu9YoxGEzSRgAgcMjMDTRXBVCU54DlZoPy60='),
(15, 'Lars13337', 'Lars', 'mattis.lars2@web.de', 'Lars13337', '10$$j2TX/N18WhGsB9Y9G08QoX7pnWe2EVeYbVVxigozFOfv92YiSpx0dsJazyNXMurYx3ZmIbbTH/mK6vO7Cd1tMbDkk2JKpy3+wI1iZ4NNbefvQoiUVHBEF969knqcVgpLq1vzLJToVEgft4sUla/qtbcrq5OZGyBs3wV4zBWs27k=$$xORHotMf3IJ6DlsgpEi+MLVydQ3zToXGx0kiyILWFFL9vpvP8rg6c5dsYbfMUwdrrs6f5ByD/rpKy0CV9qv/TeyJnixeu2aubMNDbVX1rM1YGCXs7d7k3i7nc4TN4LqdtdLNA+uinFLVr4txmakSHJaRivlahiPQSyzyRUNB4Jbk5JJ9t+6sy9UHQPSFu/2a0PpDLxkhQ6rfa0Bxqt1D4CgKzXk9xkMQ7tuZSkrqe1Ag74pTDYK5QlcWwYlQgVySYZM09Dcdoo3jthpMzWjYZzhX7pCRkzMTUUQ4kTnSsJ0dxr/4HLfN29suFFFydKur9dliGIaof8NvTzqow21Zwfftk3X/PRhQG/hmXpoqRQvHTKRQsznqG7aet+J1czf9YE6Hmey08AjO+3zaqmkC5thXIWkoIq3+pDhZZCiBGY8qb3/iM3QPlbHKzQpNtq414Nf+haQlhq3fvjVcW9qjL3morfpUuvgl3QT3zL741x9lgo2coBUYylfC2wksiUM1V1sJQuGncs5v0/lfL5GWYwGa/ZjkFZuLmpGRUqOEhgycTdTxD1hSzgyAt76eYRu5YtP2Q47e7e36EGFi1SBU+QXcR6NMi/GbI19/hYd8TXZvQMOBT1MThTk/j2WV2nmrQ0jqAyLNVRHYTyG83lDIDtEx5uDSa7bbhjcZimQAm/A=');

-- --------------------------------------------------------

--
-- Table structure for table `User_Privileges`
--

CREATE TABLE `User_Privileges` (
  `UserID` bigint(20) NOT NULL,
  `PrivilegeID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User_Privileges`
--

INSERT INTO `User_Privileges` (`UserID`, `PrivilegeID`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Doors`
--
ALTER TABLE `Doors`
  ADD PRIMARY KEY (`DoorID`);

--
-- Indexes for table `Modules`
--
ALTER TABLE `Modules`
  ADD PRIMARY KEY (`ModuleID`);

--
-- Indexes for table `Privileges`
--
ALTER TABLE `Privileges`
  ADD PRIMARY KEY (`PrivilegeID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Doors`
--
ALTER TABLE `Doors`
  MODIFY `DoorID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Modules`
--
ALTER TABLE `Modules`
  MODIFY `ModuleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Privileges`
--
ALTER TABLE `Privileges`
  MODIFY `PrivilegeID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
