-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2026 at 02:06 PM
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
  `email` text NOT NULL,
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
  `number` text NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `appointmentId`, `userId`, `doctorId`, `patientId`, `caseId`, `hospitalId`, `paymentType`, `appointmentFor`, `email`, `sideEffects`, `razorpayOrderId`, `date`, `time`, `couponCode`, `discountAmount`, `finalAmount`, `appointmentFees`, `paymentStatus`, `transactionId`, `illnessInfo`, `doctorNotes`, `cancelReason`, `discountCode`, `discountPrice`, `zoomUrl`, `appointmentStatus`, `createdAt`, `updatedAt`, `number`, `images`) VALUES
(4, 'APP1769674961784', 3, 1, 2, NULL, 1, 'Online', 'Sister', 'hbsdevelopersteam@gmail.com', 'n', 'order_S9filS1odg01Mp', '2026-01-30', '10:00', '', 0, 500, 500, 'Paid', 'pay_S9fitoJOGxPhxC', 'Illness Information', 'n', NULL, NULL, NULL, NULL, 'Booked', '2026-01-29 13:52:41.787192', '2026-01-29 16:37:15.000000', '', NULL),
(6, 'APP1770112227219', 3, 1, 2, NULL, NULL, '', 'Sister', '', 'no', NULL, '', '', '', NULL, 0, NULL, NULL, NULL, 'Illness Information', 'no', NULL, NULL, NULL, NULL, 'NoFill', '2026-02-03 15:20:27.226931', '2026-02-03 15:27:33.000000', '', NULL),
(7, 'APP1770114571475', 3, 1, NULL, NULL, NULL, 'Online', 'For me', 'hbsdevelopersteam@gmail.com', 'n', 'order_SBeGieVRYDZjqg', '2026-02-04', '10:00', '', 0, 500, 500, 'Paid', 'pay_SBeGsSBFPTDxk7', '', 'n', NULL, NULL, NULL, NULL, 'Booked', '2026-02-03 15:59:31.479155', '2026-02-03 16:30:03.000000', '7050494706', NULL),
(8, 'APP1770116778396', 3, 1, NULL, NULL, NULL, '', '', '', '', NULL, '', '', '', NULL, 0, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 'NoFill', '2026-02-03 16:36:18.400671', '2026-02-03 16:36:18.400671', '', NULL);

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
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Cardiology', '', 1, '2026-02-03 18:08:04.000000', '2026-02-03 18:08:07.000000'),
(2, 'Dermatology', '', 1, '2026-02-03 18:08:11.000000', '2026-02-03 18:08:13.000000'),
(3, 'ENT', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(4, 'Gynecology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(5, 'Oncology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(6, 'Neurology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(7, 'Orthopedics', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(8, 'Pediatrics', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(9, 'Cardiothoracic', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(10, 'Psychiatry', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(11, 'General Surgery', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458'),
(12, 'Radiology', '', 1, '2026-02-03 18:08:00.420458', '2026-02-03 18:08:00.420458');

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
  `doctorId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`, `userId`, `expertise`, `hospitalId`, `categoryId`, `treatmentId`, `image`, `desc`, `education`, `certificate`, `appointmentFees`, `experience`, `timeSlot`, `dob`, `gender`, `isActive`, `isVerified`, `isPopular`, `patientVideoCall`, `createdAt`, `updatedAt`, `doctorId`) VALUES
(1, 'Suman', 1, 'Surgical Procedures', 1, 2, 3, 'https://res.cloudinary.com/do34gd7bu/image/upload/v1770119190/uploads/at2qzvc7udbg9gssv1yi.jpg', 'Experience the future of healthcare with our comprehensive platform designed for modern patients and healthcare providers.\r\n\r\nSmart Scheduling\r\nAI-powered appointment booking that finds the perfect time slot for you\r\n\r\n24/7 Telemedicine\r\nConnect with doctors instantly through video consultations anytime\r\n\r\n', '[{\"id\":\"1\",\"degree\":\"10\",\"institution\":\"Delhi\",\"year\":\"2012\"},{\"id\":\"2\",\"degree\":\"12\",\"institution\":\"Delhi\",\"year\":\"2015\"}]', '[{\"id\":\"1\",\"name\":\"BPSC\",\"year\":\"2013\"}]', '500', '10', '30', '1998-07-19', 'male', 1, 1, 1, 0, '2025-07-19 17:38:22.499802', '2026-02-03 18:21:51.456503', 'DOC1770119191063');

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
(1, 1, 1, 1, '2026-01-14', '2026-02-14', 'Welcome Plan', 0, 'ddddd', 1, '500', '0', 'active', 1, '2026-01-14 15:20:46.000000', '2026-01-14 15:27:42.916110');

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
(2, 1, 3, '2026-01-21 17:57:57.000000', '2026-01-21 17:57:57.000000');

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
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `userId`, `name`, `age`, `gender`, `relation`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'Manish', 35, 'Male', 'Brother', '2026-01-29 13:57:40.000000', '2026-01-29 13:57:40.000000'),
(2, 3, 'Sister', 30, NULL, 'Sister', '2026-01-29 16:27:21.156660', '2026-02-03 15:29:53.538118');

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
  `nextFollowUpDate` date DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `name`, `totalAppointment`, `price`, `validity`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Free', 500, 0, 1, NULL, '2025-07-19 16:39:26.000000', '2025-08-05 18:12:32.707019'),
(2, 'Standard', 3000, 750, 3, NULL, '2025-07-19 16:39:31.000000', '2025-08-05 18:12:30.620531'),
(3, 'Premium', 10000, 1200, 12, NULL, '2025-07-19 16:39:38.000000', '2025-07-19 16:40:48.000000');

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
(9, 'Saturday', 0, '[{\"start\":\"\",\"end\":\"\"}]', '2026-01-14 16:43:26.009245', '2026-01-14 16:43:26.009245', 1);

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
(1, 'Lifestyle changes', 1, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 1),
(2, 'Medications', 1, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 1),
(3, 'Laser therapy', 1, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 2),
(4, 'Cryotherapy', 1, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `HowManyOtpSend` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `otp` int(11) DEFAULT NULL,
  `login_otp` int(11) DEFAULT NULL,
  `otp_expires_at` timestamp NULL DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `image` varchar(255) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 0,
  `contact_number_verified` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `address` varchar(255) DEFAULT NULL,
  `doctorId` bigint(20) UNSIGNED DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `username`, `password`, `HowManyOtpSend`, `phone`, `otp`, `login_otp`, `otp_expires_at`, `dob`, `gender`, `role`, `image`, `isActive`, `contact_number_verified`, `createdAt`, `updatedAt`, `address`, `doctorId`, `age`, `state`, `city`) VALUES
(1, 'mks95***@gmail.com', NULL, 'Suman', NULL, 0, '6200027897', 810737, 0, '2026-02-03 11:47:48', '1998-07-19', 'male', 'doctor', 'https://res.cloudinary.com/do34gd7bu/image/upload/v1770119190/uploads/at2qzvc7udbg9gssv1yi.jpg', 1, 0, '2025-07-19 17:10:10.754959', '2026-02-03 18:13:17.149338', NULL, 1, NULL, 'Delhi', 'Delhi'),
(3, 'hbsdevelopersteam@gmail.com', '2026-01-22 10:06:29', 'Manish', '$2b$10$WqYFgxilZIygnem0Wxt2sewewok3nbSSbms2k6slO/xHU0h5zHhjq', 0, '7050494706', 990459, 0, '2026-02-03 11:33:49', '2026-01-21', 'male', 'user', 'https://res.cloudinary.com/do34gd7bu/image/upload/v1769066854/user_profiles/cgzk2cclhpx4qmrsbuyq.png', 1, 0, '2025-07-21 18:29:41.615401', '2026-02-03 17:01:58.000000', '916 , 9th Floor, Tower-2, Pearls Omaxe, NSP, Pitampura, Delhi-110034', NULL, 25, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `address` text DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL,
  `facility` text DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2c24c3490a26d04b0d70f92057a` (`userId`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5c22ff49adf67549a85db811a72` (`appointmentId`),
  ADD KEY `FK_70c09156f15578f0361dc635bd1` (`caseId`),
  ADD KEY `FK_42c70415fad4505386e6d7e9dc4` (`doctorId`);

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
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `FK_2c24c3490a26d04b0d70f92057a` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `FK_42c70415fad4505386e6d7e9dc4` FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5c22ff49adf67549a85db811a72` FOREIGN KEY (`appointmentId`) REFERENCES `appointments` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
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
