/*
  Warnings:

  - Made the column `attendance_status` on table `emp_management` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `emp_management` MODIFY `attendance_status` ENUM('Present', 'Absent') NOT NULL;
