-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2026 at 06:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicare`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointmentId` varchar(100) NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED NOT NULL,
  `patientId` bigint(20) UNSIGNED DEFAULT NULL,
  `caseId` bigint(20) UNSIGNED DEFAULT NULL,
  `hospitalId` bigint(20) UNSIGNED DEFAULT NULL,
  `paymentType` varchar(255) NOT NULL,
  `appointmentFor` varchar(255) NOT NULL,
  `sideEffects` text NOT NULL,
  `razorpayOrderId` varchar(100) DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `couponCode` varchar(255) NOT NULL,
  `discountAmount` int(11) DEFAULT NULL,
  `finalAmount` int(11) NOT NULL,
  `appointmentFees` int(11) DEFAULT NULL,
  `paymentStatus` varchar(255) DEFAULT NULL,
  `transactionId` varchar(255) DEFAULT NULL,
  `illnessInfo` varchar(255) DEFAULT NULL,
  `doctorNotes` text NOT NULL,
  `cancelReason` text DEFAULT NULL,
  `discountCode` varchar(255) DEFAULT NULL,
  `discountPrice` int(11) DEFAULT NULL,
  `zoomUrl` varchar(255) DEFAULT NULL,
  `appointmentStatus` enum('Available','Booked','Hold','Approved','Rescheduled','Completed','CancelledByUser','Cancelled','CancelledByDoctor','NoFill') NOT NULL DEFAULT 'Hold',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `patientName` varchar(255) NOT NULL,
  `patientAge` varchar(10) NOT NULL,
  `patientNumber` text NOT NULL,
  `patientEmail` text NOT NULL,
  `patientAddress` varchar(255) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `appointmentId`, `userId`, `doctorId`, `patientId`, `caseId`, `hospitalId`, `paymentType`, `appointmentFor`, `sideEffects`, `razorpayOrderId`, `date`, `time`, `couponCode`, `discountAmount`, `finalAmount`, `appointmentFees`, `paymentStatus`, `transactionId`, `illnessInfo`, `doctorNotes`, `cancelReason`, `discountCode`, `discountPrice`, `zoomUrl`, `appointmentStatus`, `createdAt`, `updatedAt`, `patientName`, `patientAge`, `patientNumber`, `patientEmail`, `patientAddress`, `images`) VALUES
(21, 'APP1770968161345', 3, 1, 8, NULL, NULL, 'Offline', 'For me', 'No', NULL, '2026-02-15', '17:59', '', 0, 500, 500, 'Paid', NULL, 'dfasd', 'No', NULL, NULL, NULL, NULL, 'Completed', '2026-02-13 13:06:01.349119', '2026-02-13 16:15:44.000000', 'Manish', '25', '7050494706', 'hbsdevelopersteam@gmail.com', '916 , 9th Floor, Tower-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL),
(24, 'APP1770985712796', 3, 1, 8, NULL, NULL, 'Online', 'For me', 'No', 'order_SFdCWasA2kAEB8', '2026-02-16', '10:30', '', 0, 500, 500, 'Paid', 'pay_SFdCez7fNx0RAT', 'I have dvt', 'No', NULL, NULL, NULL, NULL, 'Completed', '2026-02-13 17:58:32.797877', '2026-02-13 18:19:02.000000', 'Saroj Kumar', '22', '7050494706', 'hbsdevelopersteam@gmail.com', '916 , 9th Floor, Tower-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL),
(27, 'APP1772801348203', 3, 1, 9, NULL, NULL, 'Online', 'Brother', 'No', 'order_SNwi1PQW52MfH1', '2026-03-08', '17:29', '', 0, 500, 500, 'Paid', 'pay_SNwi8eEuoB9uj1', 'Illness Information', 'No', NULL, NULL, NULL, NULL, 'Completed', '2026-03-06 18:19:08.207517', '2026-03-06 18:22:05.000000', 'Manish', '30', '7050494706', 'hbsdevelopersteam@gmail.com', '916 , 9th Floor, Tower-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(255) NOT NULL DEFAULT '',
  `isPublished` tinyint(4) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patientId` bigint(20) UNSIGNED DEFAULT NULL,
  `doctorId` bigint(20) UNSIGNED DEFAULT NULL,
  `disease` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Ongoing' COMMENT 'Ongoing or Closed',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `icon` varchar(255) NOT NULL,
  `slug` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `isActive`, `createdAt`, `updatedAt`, `icon`, `slug`) VALUES
(1, 'Cardiology', '', 1, '2026-02-03 18:08:04.000000', '2026-02-17 16:28:53.128764', 'Heart', 'cardiology'),
(2, 'Dermatology', '', 1, '2026-02-03 18:08:11.000000', '2026-02-17 16:28:58.425431', 'Shield', 'dermatology'),
(3, 'ENT', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:02.748908', 'Baby', 'ent'),
(4, 'Gynecology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:10.572565', 'Bone', 'gynecology'),
(5, 'Oncology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:16.396994', 'Brain', 'oncology'),
(6, 'Neurology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:21.768644', 'UserCheck', 'neurology'),
(7, 'Orthopedics', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:28.731275', 'Brain', 'orthopedics'),
(8, 'Pediatrics', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:35.006254', 'Eye', 'pediatrics'),
(9, 'Cardiothoracic', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:46.220178', 'Ear', 'cardiothoracic'),
(10, 'Psychiatry', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:29:53.793634', 'Pill', 'psychiatry'),
(11, 'General Surgery', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:30:05.240820', 'Stethoscope', 'general-surgery'),
(12, 'Radiology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-17 16:30:09.838401', 'Activity', 'radiology');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `hospitalId` bigint(20) UNSIGNED DEFAULT NULL,
  `categoryId` bigint(20) UNSIGNED DEFAULT NULL,
  `treatmentId` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `desc` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `certificate` text DEFAULT NULL,
  `appointmentFees` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `timeSlot` varchar(100) DEFAULT NULL,
  `dob` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 0,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `isPopular` tinyint(4) NOT NULL DEFAULT 0,
  `patientVideoCall` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `doctorId` varchar(255) DEFAULT NULL,
  `kycDocument` varchar(255) DEFAULT NULL,
  `kycApproved` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`, `userId`, `expertise`, `hospitalId`, `categoryId`, `treatmentId`, `image`, `desc`, `education`, `certificate`, `appointmentFees`, `experience`, `timeSlot`, `dob`, `gender`, `isActive`, `isVerified`, `isPopular`, `patientVideoCall`, `createdAt`, `updatedAt`, `doctorId`, `kycDocument`, `kycApproved`) VALUES
(1, 'Suman', 1, 'Surgical Procedures', 1, 2, 3, 'https://res.cloudinary.com/do34gd7bu/image/upload/v1770798476/uploads/k4uljydnrzspgvpgyt6s.jpg', 'Experience the future of healthcare with our comprehensive platform designed for modern patients and healthcare providers.\r\n\r\nSmart Scheduling\r\nAI-powered appointment booking that finds the perfect time slot for you\r\n\r\n24/7 Telemedicine\r\nConnect with doctors instantly through video consultations anytime\r\n\r\n', '[{\"id\":\"1\",\"degree\":\"10\",\"institution\":\"Delhi\",\"year\":\"2012\"},{\"id\":\"2\",\"degree\":\"12\",\"institution\":\"Delhi\",\"year\":\"2015\"}]', '[{\"id\":\"1\",\"name\":\"MBBS\",\"year\":\"2013\"},{\"id\":\"2\",\"name\":\"MA\",\"year\":\"2020\"},{\"id\":\"3\",\"name\":\"MBA\",\"year\":\"2020\"}]', '500', '10', '30', '1998-07-19', 'male', 1, 1, 1, 0, '2025-07-19 17:38:22.499802', '2026-02-11 13:57:56.000000', 'DOC1770798476830', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_subscriptions`
--

CREATE TABLE `doctor_subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED DEFAULT NULL,
  `subscriptionId` bigint(20) UNSIGNED DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `paymentType` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `paymentStatus` tinyint(4) NOT NULL,
  `appointmentLimit` varchar(255) NOT NULL DEFAULT '0',
  `usedAppointments` varchar(255) NOT NULL DEFAULT '0',
  `status` enum('active','expired') NOT NULL DEFAULT 'active',
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_subscriptions`
--

INSERT INTO `doctor_subscriptions` (`id`, `doctorId`, `subscriptionId`, `duration`, `startDate`, `endDate`, `paymentType`, `amount`, `paymentId`, `paymentStatus`, `appointmentLimit`, `usedAppointments`, `status`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, '2026-01-14', '2026-08-14', 'Welcome Plan', 0, 'ddddd', 1, '500', '0', 'expired', 0, '2026-01-14 15:20:46.000000', '2026-02-06 16:59:39.000000'),
(2, 1, 2, 3, '2026-02-06T11:29:40.442Z', '2026-05-06T11:29:40.442Z', 'razorpay', 500, 'pay_SCqNR0RUu4mKNy', 1, '3000', '0', 'active', 1, '2026-02-06 16:59:40.448363', '2026-02-06 16:59:40.448363');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `doctorId`, `userId`, `createdAt`, `updatedAt`) VALUES
(5, 1, 3, '2026-02-04 18:11:53.918621', '2026-02-04 18:11:53.918621');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL,
  `facility` text DEFAULT NULL,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `isActive` tinyint(4) NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `name`, `phone`, `address`, `lat`, `lng`, `facility`, `isVerified`, `isActive`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Suman Hospital', '6200027897', 'Address 916 , 9th Floor, Toweer-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL, NULL, '10', 1, 1, 1, '2025-07-19 17:14:34.410063', '2025-08-05 16:41:00.687611'),
(3, 'Suman-2', '06200027897', 'Address 916 , 9th Floor, Toweer-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL, NULL, '22', 1, 1, 1, '2026-01-21 17:27:57.259064', '2026-01-21 17:28:11.980835');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `medicineCategoryId` bigint(20) UNSIGNED NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicine_categories`
--

CREATE TABLE `medicine_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `isRead` tinyint(4) NOT NULL DEFAULT 0,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`title`, `message`, `type`, `isRead`, `isDeleted`, `userId`, `createdAt`, `id`) VALUES
('This id demo', 'this is demo messsage ', 'admin', 0, 0, 3, '0000-00-00 00:00:00.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `relation` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `patientId` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `userId`, `name`, `age`, `gender`, `relation`, `createdAt`, `updatedAt`, `patientId`, `email`, `phone`) VALUES
(8, 3, 'Manish', 25, NULL, 'For me', '2026-02-13 13:13:31.407967', '2026-02-17 18:09:58.000000', 'PAT834729', 'hbsdevelopersteam@gmail.com', '7050494706'),
(9, 3, 'Manish', 30, NULL, 'Brother', '2026-03-06 18:19:38.029431', '2026-03-06 18:19:38.029431', 'PAT378028', 'hbsdevelopersteam@gmail.com', '7050494706');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `referenceId` varchar(255) NOT NULL,
  `referenceType` varchar(255) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `platformCommission` decimal(10,0) NOT NULL DEFAULT 0,
  `doctorEarning` decimal(10,0) NOT NULL DEFAULT 0,
  `paymentMethod` varchar(255) NOT NULL,
  `paymentStatus` varchar(255) NOT NULL,
  `payoutDone` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `id` int(11) NOT NULL,
  `appointmentId` bigint(20) UNSIGNED DEFAULT NULL,
  `caseId` bigint(20) UNSIGNED DEFAULT NULL,
  `doctorId` bigint(20) UNSIGNED DEFAULT NULL,
  `medicines` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`medicines`)),
  `advice` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `followUpDate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`id`, `appointmentId`, `caseId`, `doctorId`, `medicines`, `advice`, `createdAt`, `updatedAt`, `followUpDate`) VALUES
(4, 21, NULL, 1, '[{\"name\":\"gfdg\",\"dosage\":\"\",\"duration\":\"dfg\",\"instructions\":\"fdg\"}]', 'df', '2026-02-13 16:56:24.504189', '2026-02-13 16:56:24.504189', '2026-02-13'),
(5, 24, NULL, 1, '[{\"name\":\"Laufa\",\"dosage\":\"asdsdf\",\"duration\":\"5\",\"instructions\":\"gbdxfgdg\"}]', 'fdgdfgdfdfhbf', '2026-02-13 18:18:46.991076', '2026-02-13 18:18:46.991076', '2026-02-21'),
(6, 27, NULL, 1, '[{\"name\":\"safdas\",\"dosage\":\"500\",\"duration\":\"sdfgdf\",\"instructions\":\"fgv\"},{\"name\":\"sad\",\"dosage\":\"77\",\"duration\":\"dsfsda\",\"instructions\":\"fasd\"}]', 'addsfasd', '2026-03-06 18:21:58.009840', '2026-03-06 18:21:58.009840', '2026-03-11');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `reportDate` varchar(255) NOT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `review` text NOT NULL,
  `rate` int(11) NOT NULL,
  `appointmentId` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `totalAppointment` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `validity` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `period` varchar(255) DEFAULT NULL,
  `features` varchar(255) DEFAULT NULL,
  `noAddonFeatures` varchar(255) DEFAULT NULL,
  `buttonText` varchar(255) DEFAULT NULL,
  `gradient` varchar(255) DEFAULT NULL,
  `buttonStyle` varchar(255) DEFAULT NULL,
  `buttonTextColor` varchar(255) DEFAULT NULL,
  `popular` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `name`, `totalAppointment`, `price`, `validity`, `description`, `createdAt`, `updatedAt`, `period`, `features`, `noAddonFeatures`, `buttonText`, `gradient`, `buttonStyle`, `buttonTextColor`, `popular`) VALUES
(1, 'Basic', 500, 0, 1, 'Perfect for occasional consultations', '2026-02-04 11:18:56.017652', '2026-02-04 11:46:51.783464', 'Forever', '[\"Book up to 2 appointments/month\",\"Basic health records\",\"Email support\",\"Mobile app access\",\"Prescription reminders\"]', '[\r\n    \"Specialist referrals\",\r\n    \"Telemedicine consultations\",\r\n    \"Priority booking\"\r\n  ]', 'Get Started Free', 'from-gray-50 to-gray-100', 'bg-gray-900 hover:bg-gray-800 text-white', NULL, 0),
(2, 'Standard\n', 3000, 500, 3, 'Ideal for regular healthcare needs', '2026-02-04 11:19:33.149059', '2026-02-04 11:47:23.634839', 'per month', '[\"Unlimited appointments\",\"Priority booking\",\"Advanced health analytics\",\"24/7 chat support\",\"Prescription management\",\"Family member profiles\",\"Telemedicine consultations\",\"Health goal tracking\"]', NULL, 'Start Free Trial', 'from-blue-50 to-indigo-100', 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white', NULL, 1),
(3, 'Professional ', 10000, 10000, 12, 'Complete healthcare for your family', '2026-02-04 11:19:50.886918', '2026-02-05 15:48:34.029267', 'per month', '[\"Everything in Premium\",\"Up to 6 family members\",\"Dedicated family coordinator\",\"Home visit consultations\",\"Emergency hotline\",\"Annual health checkups\",\"Specialist referrals\",\"Health insurance integration\"]', NULL, 'Contact Sales', 'from-gray-50 to-gray-100', 'bg-gray-900 hover:bg-gray-800 text-white', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `testimonial` text NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `highlight` varchar(255) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `location`, `image`, `testimonial`, `rating`, `highlight`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Sarah Johnson', 'Working Mother', 'New York, NY', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'MediCare+ made it incredibly easy to find a pediatrician for my daughter. The booking process was seamless, and Dr. Martinez was thorough and caring. The telemedicine feature is a game-changer for busy parents!', 5, 'Saved 3 hours per appointment', 1, '2026-02-17 17:30:50.000000', '2026-02-17 17:30:50.000000'),
(2, 'Michael Chen', 'Senior Executive', 'San Francisco, CA', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'As someone with a demanding schedule, being able to book appointments online and get instant confirmations has been revolutionary. The quality of care and professionalism of doctors is outstanding.', 5, 'Reduced wait times by 80%', 1, '2026-02-17 17:30:50.000000', '2026-02-17 17:30:50.000000'),
(3, 'Emily Rodriguez', 'College Student', 'Austin, TX', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'The affordable pricing and easy access to specialists helped me get the mental health support I needed without breaking the bank. The platform is intuitive and the doctors genuinely care.', 5, 'Affordable student pricing', 1, '2026-02-17 17:30:50.000000', '2026-02-17 17:30:50.000000');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `slots` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`slots`)),
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `doctorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `day`, `active`, `slots`, `createdAt`, `updatedAt`, `doctorId`) VALUES
(1, 'Sunday', 1, '[{\"start\":\"17:29\",\"end\":\"20:29\"}]', '2026-01-14 16:29:29.650474', '2026-01-14 16:43:32.285638', 1),
(2, 'Monday', 1, '[{\"start\":\"10:00\",\"end\":\"11:00\"},{\"start\":\"16:00\",\"end\":\"18:00\"}]', '2026-01-14 16:31:49.436906', '2026-01-15 13:42:56.766926', 1),
(3, 'Tuesday', 1, '[{\"start\":\"10:00\",\"end\":\"13:00\"}]', '2026-01-14 16:33:43.672556', '2026-01-14 16:43:35.886423', 1),
(4, 'Wednesday', 1, '[{\"start\":\"10:00\",\"end\":\"16:00\"}]', '2026-01-14 16:34:24.048462', '2026-01-14 16:43:37.190305', 1),
(5, 'Thursday', 1, '[{\"start\":\"10:00\",\"end\":\"12:00\"},{\"start\":\"16:00\",\"end\":\"18:00\"}]', '2026-01-14 16:34:45.843374', '2026-01-14 16:58:44.000000', 1),
(6, 'Friday', 1, '[{\"start\":\"10:00\",\"end\":\"12:00\"}]', '2026-01-14 16:35:10.540816', '2026-01-15 14:57:28.985696', 1),
(9, 'Saturday', 0, '[{\"start\":\"20:22\",\"end\":\"22:22\"}]', '2026-01-14 16:43:26.009245', '2026-02-13 18:23:01.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `categoryId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatments`
--

INSERT INTO `treatments` (`id`, `name`, `isActive`, `createdAt`, `updatedAt`, `categoryId`) VALUES
(1, 'Lifestyle changes', 1, '2026-02-13 12:54:28.000000', '2026-03-09 18:10:01.000000', 1),
(2, 'Medications', 1, '2026-02-13 12:54:35.000000', '2026-02-13 12:54:40.000000', 1),
(3, 'Laser therapy', 1, '2026-02-13 12:54:42.000000', '2026-03-09 18:02:12.000000', 2),
(4, 'Cryotherapy', 1, '2026-02-13 00:00:00.000000', '2026-03-09 18:10:52.000000', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `HowManyOtpSend` int(11) NOT NULL DEFAULT 0,
  `phone` varchar(255) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `image` varchar(255) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `address` varchar(255) DEFAULT NULL,
  `doctorId` bigint(20) UNSIGNED DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `emailNotifications` tinyint(4) NOT NULL DEFAULT 1,
  `smsNotifications` tinyint(4) NOT NULL DEFAULT 1,
  `appointmentReminders` tinyint(4) NOT NULL DEFAULT 1,
  `showProfileToDoctors` tinyint(4) NOT NULL DEFAULT 1,
  `allowAnalytics` tinyint(4) NOT NULL DEFAULT 0,
  `otpExpireTime` timestamp NULL DEFAULT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `username`, `password`, `HowManyOtpSend`, `phone`, `otp`, `dob`, `gender`, `role`, `image`, `isActive`, `createdAt`, `updatedAt`, `address`, `doctorId`, `age`, `state`, `city`, `emailNotifications`, `smsNotifications`, `appointmentReminders`, `showProfileToDoctors`, `allowAnalytics`, `otpExpireTime`, `verified`) VALUES
(1, 'mks957678@gmail.com', NULL, 'Suman', NULL, 0, '6200027897', 810737, '1998-07-19', 'male', 'doctor', 'https://res.cloudinary.com/do34gd7bu/image/upload/v1770798476/uploads/k4uljydnrzspgvpgyt6s.jpg', 1, '2025-07-19 17:10:10.754959', '2026-03-09 11:51:34.744344', '916 , 9th Floor, Tower-2, Pearls Omaxe, NSP, Pitam.', 1, NULL, 'Delhi', 'Delhi', 1, 1, 1, 1, 0, NULL, 1),
(3, 'hover@gmail.com', '2026-01-22 10:06:29', 'Manish', '$2b$10$WqYFgxilZIygnem0Wxt2sewewok3nbSSbms2k6slO/xHU0h5zHhjq', 0, '7050494706', 990459, '2026-01-21', 'male', 'user', 'https://res.cloudinary.com/do34gd7bu/image/upload/v1770986401/user_profiles/xvgmoc1cxb794abvmfvo.jpg', 1, '2025-07-21 18:29:41.615401', '2026-03-09 13:02:01.516278', '916 , 9th Floor, Tower-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL, 25, NULL, NULL, 1, 1, 1, 1, 0, NULL, 1),
(5, 'admin@gmail.com', '2026-02-19 09:31:42', 'Sper admin', '$2b$10$WqYFgxilZIygnem0Wxt2sewewok3nbSSbms2k6slO/xHU0h5zHhjq', 0, '', NULL, NULL, NULL, 'SUPER_ADMIN', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 1, '2026-02-19 15:04:13.000000', '2026-03-09 11:51:37.552526', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, 0, NULL, 1),
(6, NULL, NULL, 'Guest', '$2b$10$CR1Y4UXF00zWr0Icqx3rae5cWjT0/gZlMSTN8j37tofq8SDTCPWs.', 0, '7050494705', NULL, NULL, NULL, 'user', 'https://ui-avatars.com/api/?name=Guest', 1, '2026-03-09 11:38:31.098148', '2026-03-09 11:38:44.000000', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, 0, NULL, 1),
(9, 'hbsdevelopersteam@gmail.com', NULL, 'Hover Business', NULL, 0, NULL, NULL, NULL, NULL, 'user', 'https://lh3.googleusercontent.com/a/ACg8ocIjI3MAjw_H3aQEBaPIM62t_MR7E_ChPa48CUON-korG2DM=s96-c', 1, '2026-03-09 13:42:56.477831', '2026-03-09 13:42:56.477831', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, 0, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `videocall_history`
--

CREATE TABLE `videocall_history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED NOT NULL,
  `date` varchar(255) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `working_hours`
--

CREATE TABLE `working_hours` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED NOT NULL,
  `day_index` varchar(255) NOT NULL,
  `period_list` text NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zoom_meeting`
--

CREATE TABLE `zoom_meeting` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doctorId` bigint(20) UNSIGNED NOT NULL,
  `zoom_api_url` varchar(255) DEFAULT NULL,
  `zoom_api_key` varchar(255) DEFAULT NULL,
  `zoom_api_secret` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_16345caffd6ea5e1a799639b01` (`appointmentId`),
  ADD KEY `IDX_01733651151c8a1d6d980135cc` (`userId`),
  ADD KEY `IDX_0c1af27b469cb8dca420c160d6` (`doctorId`),
  ADD KEY `FK_36cc65c41268c0483eb22556e29` (`hospitalId`),
  ADD KEY `FK_13c2e57cb81b44f062ba24df57d` (`patientId`),
  ADD KEY `FK_2736e5b12427c92454073cf8d27` (`caseId`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_258c401699f4f57843c4dabf4d0` (`patientId`),
  ADD KEY `FK_5782543ee9f4fa28b923c0688a2` (`doctorId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_059971ad86db9f4acff1ef31ac` (`doctorId`),
  ADD KEY `FK_55651e05e46413d510215535edf` (`userId`),
  ADD KEY `FK_b7c9cc719c797fa0e4f9e2b1303` (`hospitalId`),
  ADD KEY `FK_114c4b17c58a98f20b1f9385bee` (`categoryId`);

--
-- Indexes for table `doctor_subscriptions`
--
ALTER TABLE `doctor_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_37220a1b86d4338fc396406fd6c` (`doctorId`),
  ADD KEY `FK_339ba4af5d5b5ef52fde09e0114` (`subscriptionId`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e747534006c6e3c2f09939da60f` (`userId`),
  ADD KEY `FK_e7f0aa924d1348939268f982579` (`doctorId`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicine_categories`
--
ALTER TABLE `medicine_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_692a909ee0fa9383e7859f9b406` (`userId`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2c24c3490a26d04b0d70f92057a` (`userId`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_70c09156f15578f0361dc635bd1` (`caseId`),
  ADD KEY `FK_42c70415fad4505386e6d7e9dc4` (`doctorId`),
  ADD KEY `FK_5c22ff49adf67549a85db811a72` (`appointmentId`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_c31ecfdeea1039c10e01439fd8` (`day`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3aafcf1717078787eebc1da8654` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`),
  ADD UNIQUE KEY `REL_34bd2811972ab6cc0f96a4f644` (`doctorId`);

--
-- Indexes for table `videocall_history`
--
ALTER TABLE `videocall_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `working_hours`
--
ALTER TABLE `working_hours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zoom_meeting`
--
ALTER TABLE `zoom_meeting`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `doctor_subscriptions`
--
ALTER TABLE `doctor_subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicine_categories`
--
ALTER TABLE `medicine_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `videocall_history`
--
ALTER TABLE `videocall_history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `working_hours`
--
ALTER TABLE `working_hours`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zoom_meeting`
--
ALTER TABLE `zoom_meeting`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `FK_01733651151c8a1d6d980135cc4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_0c1af27b469cb8dca420c160d65` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_13c2e57cb81b44f062ba24df57d` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_2736e5b12427c92454073cf8d27` FOREIGN KEY (`caseId`) REFERENCES `cases` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_36cc65c41268c0483eb22556e29` FOREIGN KEY (`hospitalId`) REFERENCES `hospitals` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `FK_258c401699f4f57843c4dabf4d0` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5782543ee9f4fa28b923c0688a2` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `FK_114c4b17c58a98f20b1f9385bee` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_55651e05e46413d510215535edf` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b7c9cc719c797fa0e4f9e2b1303` FOREIGN KEY (`hospitalId`) REFERENCES `hospitals` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `doctor_subscriptions`
--
ALTER TABLE `doctor_subscriptions`
  ADD CONSTRAINT `FK_339ba4af5d5b5ef52fde09e0114` FOREIGN KEY (`subscriptionId`) REFERENCES `subscriptions` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_37220a1b86d4338fc396406fd6c` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK_e747534006c6e3c2f09939da60f` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e7f0aa924d1348939268f982579` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK_692a909ee0fa9383e7859f9b406` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `FK_2c24c3490a26d04b0d70f92057a` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `FK_42c70415fad4505386e6d7e9dc4` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5c22ff49adf67549a85db811a72` FOREIGN KEY (`appointmentId`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_70c09156f15578f0361dc635bd1` FOREIGN KEY (`caseId`) REFERENCES `cases` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `FK_3aafcf1717078787eebc1da8654` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_34bd2811972ab6cc0f96a4f6440` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
