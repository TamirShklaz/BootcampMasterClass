let set1 = [79, 70, 60, 48, 93, 76, 76, 78, 58, 68, 53, 62, 96, 79, 88, 75, 79, 77, 67, 72, 66, 82, 67, 47, 91, 100, 76, 36, 65, 68, 66, 100, 68, 95, 70, 68, 74, 85, 91, 69, 83, 74, 58, 76, 76, 61, 64, 73, 70, 98, 63, 56, 56, 36, 51, 73, 72, 52, 95, 61, 35, 81, 85, 80, 61, 54, 53, 80, 47, 74, 67, 98, 77, 80, 66, 64, 80, 68, 67, 61, 72, 41, 57, 95, 71, 86, 59, 54, 90, 70, 77, 71, 61, 60, 71, 94, 64, 78, 83, 69, 100, 87, 72, 62, 34, 88, 86, 100, 59, 82, 81, 78, 100, 35, 40, 61, 71, 77, 67, 70, 72, 47, 68, 85, 58, 36, 70, 87, 74, 78, 73, 89, 76, 70, 65, 60, 89, 76, 87, 53, 63, 65, 73, 72, 64, 85, 100, 59, 74, 63, 68, 55, 61, 77, 96, 66, 69, 94, 45, 60, 57, 56, 70, 86, 72, 77, 46, 62, 72, 71, 87, 89, 88, 57, 81, 68, 67, 82, 97, 96, 61, 53, 76, 67, 64, 72, 80, 86, 64, 75, 90, 71, 85, 74, 72, 82, 79, 51, 86, 81, 55, 45, 93, 63, 82, 69, 55, 83, 50, 86, 80, 56, 65, 90, 50, 73, 67, 60, 76, 77, 80, 66, 44, 88, 68, 57, 67, 63, 95, 89, 55, 78, 81, 64, 59, 65, 68, 56, 95, 85, 76, 82, 79, 73, 87, 61, 49, 82, 81, 69, 58, 84, 40, 58, 69, 79, 43, 78, 69, 72, 67, 58, 72, 84, 86, 100, 79, 79, 84, 82, 51, 82, 72, 75, 94, 50, 61, 72, 49, 66, 63, 71, 65, 96, 61, 82, 50, 93, 53, 54, 71, 76, 62, 58, 72, 77, 61, 75, 77, 62, 82, 89, 66, 84, 68, 52, 81, 82, 59, 77, 87, 75, 52, 64, 42, 79, 62, 82, 77, 45, 64, 72, 81, 92, 79, 54, 81, 73, 76, 73, 71, 55, 48, 66, 71, 75, 71, 50, 55, 50, 66, 48, 64, 59, 78, 100, 54, 87, 74, 86, 56, 81, 38, 62, 58, 61, 64, 70, 55, 86, 48, 69, 68, 64, 64, 82, 100, 54, 77, 96, 59, 56, 27, 86, 48]
let set2 = [42, 84, 68, 47, 67, 40, 63, 53, 51, 47, 68, 52, 92, 76, 62, 57, 69, 80, 65, 61, 67, 46, 76, 34, 72, 78, 67, 73, 61, 53, 49, 56, 74, 63, 81, 57, 60, 66, 61, 83, 55, 99, 89, 70, 71, 82, 69, 56, 67, 89, 28, 70, 73, 61, 82, 79, 45, 39, 74, 72, 57, 58, 62, 54, 65, 54, 91, 81, 76, 62, 50, 72, 79, 53, 69, 61, 59, 53, 42, 89, 45, 78, 56, 40, 54, 90, 63, 64, 60, 35, 77, 76, 57, 33, 65, 60, 88, 52, 63, 42, 88, 43, 74, 62, 49, 55, 55, 70, 58, 58, 83, 74, 52, 72, 56, 61, 52, 84, 42, 48, 52, 71, 72, 47, 66, 62, 59, 63, 77, 56, 94, 56, 74, 61, 89, 89, 57, 84, 55, 60, 100, 57, 69, 61, 78, 48, 57, 44, 54, 70, 70, 60, 79, 50, 94, 61, 63, 72, 57, 71, 71, 75, 66, 34, 62, 68, 69, 74, 46, 39, 74, 35, 78, 90, 64, 46, 63, 81, 39, 98, 72, 56, 99, 45, 82, 50, 48, 77, 92, 49, 68, 75, 58, 50, 48, 57, 80, 75, 39, 41, 68, 39, 85, 51, 78, 49, 78, 97, 64, 70, 52, 65, 83, 68, 85, 60, 60, 57, 55, 68, 78, 57, 33, 40, 95, 60, 75, 65, 68, 94, 64, 59, 19, 76, 69, 57, 69, 36, 88, 51, 47, 76, 49, 76, 78, 49, 67, 100, 95, 68, 66, 62, 45, 97, 47, 50, 81, 83, 74, 37, 68, 82, 75, 77, 69, 76, 83, 58, 64, 87, 52, 70, 83, 56, 54, 68, 57, 48, 56, 63, 41, 68, 46, 47, 54, 81, 71, 91, 92, 57, 60, 69, 78, 88, 41, 51, 46, 51, 55, 63, 68, 71, 80, 74, 69, 37, 56, 62, 78, 96, 74, 62, 66, 58, 62, 56, 43, 52, 72, 87, 53, 82, 67, 51, 77, 81, 66, 65, 89, 79, 41, 59, 60, 66, 91, 78, 61, 72, 40, 39, 78, 66, 79, 92, 54, 62, 75, 66, 56, 78, 46, 47, 41, 86, 90, 68, 50, 45, 53, 34, 74, 73, 43, 56, 69, 69, 56, 65, 66, 75, 80, 62, 86, 60, 70, 67, 66]
