/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,userId]` on the table `LikeRestaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `LikeRestaurant_restaurantId_userId_key` ON `LikeRestaurant`(`restaurantId`, `userId`);
