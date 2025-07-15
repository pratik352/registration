-- CreateTable
CREATE TABLE `Emp_management` (
    `employee_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `aadhar_link` VARCHAR(191) NULL,
    `whatsapp_number` VARCHAR(191) NOT NULL,
    `attendance_status` ENUM('Present', 'Absent') NOT NULL DEFAULT 'Absent',

    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
