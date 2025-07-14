-- AlterTable
ALTER TABLE `emp_management` MODIFY `attendance_status` ENUM('Present', 'Absent') NOT NULL DEFAULT 'Absent';
