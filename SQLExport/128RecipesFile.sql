-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: 128Recipes
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `prep_time` varchar(20) NOT NULL,
  `serving_size` varchar(20) NOT NULL,
  `dish_type` varchar(50) NOT NULL,
  `cuisine` varchar(50) NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `description` text NOT NULL,
  `image_src` varchar(255) NOT NULL,
  `short_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES ('Spaghetti Carbonara','JohnDoe','30 minutes','4 servings','Dinner','Italian','Spaghetti, Pancetta, Eggs, Parmesan cheese, Black pepper, Salt','1. Cook spaghetti until al dente. 2. Sauté pancetta until crispy. 3. Whisk eggs, cheese, and pepper. 4. Drain pasta, mix with egg mixture. 5. Serve immediately.','Classic Italian pasta dish with spaghetti, crispy pancetta, creamy egg and cheese sauce, and a touch of black pepper. A simple yet satisfying dinner option.','../Recipe pics/Spaghetti-Carbonara.jpg','Creamy spaghetti with pancetta and cheese'),('Sushi Rolls','JaneDoe','45 minutes','4 rolls','Lunch','Japanese','Sushi rice, Nori seaweed, Sashimi-grade fish, Avocado, Cucumber, Soy sauce, Wasabi, Pickled ginger','1. Prepare sushi rice. 2. Lay nori on bamboo mat. 3. Spread rice, add fillings. 4. Roll tightly, slice into pieces. 5. Serve with soy sauce, wasabi, ginger.','Delicious Japanese sushi rolls filled with fresh sashimi-grade fish, creamy avocado, and crisp cucumber, wrapped in seaweed and sushi rice. Served with soy sauce, wasabi, and pickled ginger.','../Recipe pics/Sushi-Rolls.jpg','Fresh sushi rolls with fish, avocado, and cucumber.'),('Tacos al Pastor','MariaGarcia','1 hour','4 tacos','Dinner','Mexican','Pork shoulder, Ancho chilies, Pineapple, Onion, Cilantro, Corn tortillas, Lime, Garlic, Oregano','1. Marinate pork with chilies, pineapple, spices. 2. Grill or roast until tender. 3. Slice thinly, serve in tortillas with onion, cilantro. 4. Garnish with lime wedges.','Traditional Mexican street tacos made with marinated pork shoulder, grilled with pineapple and spices, served on corn tortillas with onions, cilantro, and a squeeze of lime.','../Recipe pics/Tacos-al-Pastor.jpg','Flavorful tacos with grilled pork and pineapple.'),('Chicken Tikka Masala','DavidBrown','45 minutes','4 servings','Dinner','Indian','Chicken thighs, Yogurt, Tomatoes, Cream, Garam masala, Garlic, Ginger, Onion, Cilantro, Basmati rice','1. Marinate chicken in yogurt and spices. 2. Grill or bake until cooked. 3. Simmer tomatoes, cream, and spices for sauce. 4. Add chicken, cook until flavors meld. 5. Serve with rice, garnish with cilantro.','A popular Indian dish of grilled chicken in a creamy, spiced tomato sauce. Served with fragrant basmati rice and garnished with fresh cilantro.','../Recipe pics/Chicken-Tikka-Masala.jpg','Creamy chicken in spiced tomato sauce with rice.'),('Pad Thai','EmilySmith','30 minutes','4 servings','Dinner','Thai','Rice noodles, Shrimp, Tofu, Bean sprouts, Eggs, Peanuts, Garlic, Fish sauce, Tamarind paste, Lime','1. Soak noodles until soft. 2. Stir-fry shrimp, tofu, garlic. 3. Push aside, scramble eggs. 4. Add noodles, sauce, sprouts. 5. Toss until cooked. 6. Serve with peanuts, lime wedges.','Thai stir-fried rice noodles with shrimp, tofu, bean sprouts, and eggs, flavored with fish sauce, tamarind paste, and garnished with peanuts and lime. A popular street food dish.','../Recipe pics/Pad-Thai.jpg','Stir-fried noodles with shrimp and tofu.'),('Japanese Souffle Pancakes','ChrisJohnson','45 minutes','4 pancakes','Breakfast','Japanese','Cake flour, Milk, Eggs, Sugar, Baking powder, Vanilla extract, Butter','1. Separate egg whites and yolks. 2. Beat yolks with sugar until pale. 3. Mix in milk, vanilla, melted butter. 4. Sift in flour and baking powder, mix until smooth. 5. Whip egg whites until stiff peaks form. 6. Gently fold whites into batter. 7. Cook in rings on low heat, flipping carefully. 8. Serve hot, topped with syrup and fruits.','Delicate Japanese pancakes known for their airy texture, made with fluffy batter and served with syrup and fruits.','../Recipe pics/JapaneseSoufflePancakes.jpg','Fluffy Japanese pancakes with syrup and fruits.'),('Miso Soup','SarahChang','15 minutes','4 servings','Lunch','Japanese','Dashi stock, Miso paste, Tofu, Seaweed, Green onions','1. Bring dashi stock to boil. 2. Dissolve miso paste in stock. 3. Add tofu, seaweed, simmer briefly. 4. Garnish with green onions. 5. Serve hot.','Traditional Japanese soup made with dashi stock and miso paste, filled with tofu cubes, seaweed, and garnished with chopped green onions. A comforting and nutritious dish.','../Recipe pics/Miso-Soup.jpg','Savory soup with miso, tofu, and seaweed.'),('Churros','CarlosGonzalez','45 minutes','16 churros','Snacks','Mexican','Water, Butter, Sugar, Salt, All-purpose flour, Eggs, Vegetable oil, Cinnamon sugar','1. Boil water, butter, sugar, salt. 2. Stir in flour until dough forms. 3. Beat in eggs until smooth. 4. Pipe into hot oil, fry until golden. 5. Roll in cinnamon sugar. 6. Serve warm.','Traditional Mexican fried dough pastry, crispy on the outside and soft on the inside, rolled in cinnamon sugar. Served hot as a popular snack or dessert.','../Recipe pics/Churros.jpg','Crispy fried dough with cinnamon sugar.'),('Tom Yum Soup','MichaelWong','30 minutes','4 servings','Lunch','Thai','Shrimp, Lemongrass, Galangal, Kaffir lime leaves, Fish sauce, Lime juice, Thai chili, Mushrooms, Tomato','1. Bring lemongrass, galangal, and kaffir lime leaves to boil in water. 2. Add shrimp, mushrooms, tomato, and Thai chili. 3. Season with fish sauce and lime juice. 4. Simmer until shrimp is cooked. 5. Serve hot, garnished with cilantro.','Tom Yum Soup is a spicy and sour Thai soup made with shrimp, lemongrass, galangal, kaffir lime leaves, and mushrooms, flavored with fish sauce and lime juice.','../Recipe pics/Tom-Yum-Soup.jpg','Spicy Thai soup with shrimp and aromatic herbs.'),('Enchiladas Verdes','ElenaGomez','45 minutes','4 servings','Dinner','Mexican','Chicken breast, Corn tortillas, Tomatillos, Jalapeno, Onion, Garlic, Cilantro, Sour cream, Cheese, Salt, Vegetable oil','1. Cook chicken until tender, shred. 2. Blend tomatillos, jalapeno, onion, garlic, cilantro into sauce. 3. Fry tortillas briefly, dip in sauce. 4. Fill tortillas with chicken, roll up. 5. Place in baking dish, top with remaining sauce and cheese. 6. Bake until cheese melts. 7. Serve hot, garnish with sour cream and extra cilantro.','Enchiladas Verdes are a classic Mexican dish made with shredded chicken wrapped in corn tortillas, smothered in a tangy and spicy tomatillo sauce, and topped with cheese. They are baked until the cheese melts and served with sour cream.','../Recipe pics/Enchiladas-Verdes.jpg','Chicken enchiladas with tangy tomatillo sauce.'),('Masala Chai','PriyaPatel','15 minutes','2 cups','Drinks','Indian','Water, Milk, Black tea leaves, Sugar, Ginger, Cardamom, Cinnamon, Cloves','1. Boil water with spices (ginger, cardamom, cinnamon, cloves). 2. Add tea leaves, simmer. 3. Add milk, bring to boil. 4. Strain into cups, sweeten with sugar. 5. Serve hot.','Masala Chai is a traditional Indian spiced tea made with black tea leaves, milk, and a blend of aromatic spices like ginger, cardamom, cinnamon, and cloves, sweetened with sugar.','../Recipe pics/Masala-Chai.jpg','Spiced Indian tea with milk and aromatic spices.'),('Ramen','KenjiTanaka','1 hour','2 servings','Dinner','Japanese','Ramen noodles, Chicken broth, Soy sauce, Mirin, Sesame oil, Green onions, Egg, Pork belly or chicken, Seaweed','1. Simmer chicken broth, soy sauce, mirin, sesame oil. 2. Cook ramen noodles until tender. 3. Cook pork belly or chicken, slice. 4. Boil eggs until soft-boiled. 5. Serve noodles in broth, topped with sliced pork, egg, seaweed, and green onions.','Ramen is a Japanese noodle soup dish with wheat noodles served in a savory broth, topped with sliced pork or chicken, soft-boiled egg, green onions, and seaweed.','../Recipe pics/Ramen.jpg','Japanese noodle soup with savory broth and toppings.'),('Margarita Cocktail','CocktailMaster','5 minutes','1 cocktail','Drink','Mexican','Tequila, Lime juice, Triple sec, Salt, Ice','1. Rim glass with salt. 2. Shake tequila, lime juice, triple sec with ice. 3. Strain into glass. 4. Garnish with lime wedge.','A classic Mexican cocktail made with tequila, lime juice, and triple sec, served chilled in a salt-rimmed glass. Refreshing and tangy.','../Recipe pics/Margarita-Cocktail.jpg','Tequila-based cocktail with lime juice.'),('Caprese Salad','GiuseppeRossi','15 minutes','2 servings','Dinner','Italian','Tomatoes, Fresh mozzarella, Basil leaves, Olive oil, Balsamic glaze, Salt, Pepper','1. Slice tomatoes and mozzarella. 2. Arrange on plate with basil leaves. 3. Drizzle with olive oil and balsamic glaze. 4. Season with salt and pepper. 5. Serve immediately.','A simple Italian salad made with ripe tomatoes, fresh mozzarella, and basil leaves, drizzled with olive oil and balsamic glaze. Light and flavorful.','../Recipe pics/Caprese-Salad.jpg','Tomato and mozzarella salad with basil.'),('Chicken Quesadillas','CarlosHernandez','30 minutes','4 quesadillas','Lunch','Mexican','Chicken breast, Flour tortillas, Cheese, Bell peppers, Onion, Jalapeno, Cumin, Paprika, Salt','1. Cook chicken, shred. 2. Layer cheese, chicken, veggies on tortilla. 3. Fold over, cook until cheese melts. 4. Serve hot with salsa and sour cream.','Mexican quesadillas filled with tender chicken, cheese, bell peppers, and onions, seasoned with cumin and paprika, grilled until crispy and served with salsa and sour cream.','../Recipe pics/Chicken-Quesadillas.jpg','Cheesy chicken-filled tortilla.'),('Paneer Tikka','AnanyaSrivastava','45 minutes','4 servings','Lunch','Indian','Paneer, Yogurt, Bell peppers, Onion, Spices (cumin, coriander, turmeric), Lemon juice, Oil','1. Marinate paneer, veggies in yogurt, spices, lemon juice, oil. 2. Skewer and grill until golden. 3. Serve hot with mint chutney.','Paneer Tikka is a popular Indian appetizer of marinated paneer and vegetables skewered and grilled to perfection, served hot with mint chutney.','../Recipe pics/Paneer-Tikka.jpg','Grilled paneer and vegetable skewers.'),('Pad See Ew','NatashaLee','30 minutes','2 servings','Dinner','Thai','Wide rice noodles, Chicken or beef, Broccoli, Egg, Garlic, Dark soy sauce, Oyster sauce, Sugar, Vegetable oil','1. Stir-fry garlic in oil, add meat. 2. Add noodles, broccoli, sauces, sugar. 3. Push aside, scramble egg. 4. Toss everything until heated through. 5. Serve hot.','Pad See Ew is a popular Thai stir-fried noodle dish with wide rice noodles, tender chicken or beef, broccoli, and egg, flavored with a sweet and savory soy-based sauce.','../Recipe pics/Pad-See-Ew.jpg','Thai stir-fried noodles with meat and broccoli.'),('Mango Sticky Rice','VikramSingh','45 minutes','4 servings','Sweets','Thai','Sticky rice, Mangoes, Coconut milk, Sugar, Salt, Sesame seeds','1. Cook sticky rice. 2. Heat coconut milk, sugar, salt. 3. Pour over rice, let soak. 4. Serve with mango slices, sprinkle sesame seeds.','Mango Sticky Rice is a classic Thai dessert made with sticky rice soaked in sweetened coconut milk, served with fresh mango slices and sprinkled with sesame seeds.','../Recipe pics/Mango-Sticky-Rice.jpg','Thai dessert with sticky rice and mango slices.'),('Green Curry Chicken','AndrewJohnson','45 minutes','4 servings','Dinner','Thai','Chicken thighs, Green curry paste, Coconut milk, Bamboo shoots, Thai basil, Fish sauce, Sugar, Vegetable oil','1. Heat oil, add green curry paste, cook until fragrant. 2. Add chicken, stir until browned. 3. Pour in coconut milk, simmer until chicken is cooked. 4. Add bamboo shoots, simmer briefly. 5. Season with fish sauce and sugar. 6. Stir in Thai basil. 7. Serve hot with rice.','Green Curry Chicken is a classic Thai dish made with tender chicken simmered in a flavorful green curry sauce with coconut milk, bamboo shoots, and Thai basil. Best served over steamed rice.','../Recipe pics/Green-Curry-Chicken.jpg','Spicy Thai chicken curry with coconut milk and bamboo shoots.'),('Tiramisu','AndrewJohnson','4 hours','8 servings','Sweets','Italian','Ladyfingers, Mascarpone cheese, Eggs, Sugar, Espresso coffee, Cocoa powder, Marsala wine (optional)','1. Brew espresso coffee, let cool. 2. Separate eggs, beat yolks with sugar until pale. 3. Mix in mascarpone until smooth. 4. Whip egg whites until stiff peaks form. 5. Fold whites into mascarpone mixture. 6. Dip ladyfingers in coffee, layer with mascarpone mixture in a dish. 7. Refrigerate for at least 4 hours. 8. Dust with cocoa powder before serving.','Tiramisu is a classic Italian dessert made with layers of espresso-soaked ladyfingers and creamy mascarpone cheese mixture, dusted with cocoa powder. It is rich, creamy, and delicious.','../Recipe pics/Tiramisu.jpg','Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'AndrewJohnson','qwerty123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-20 18:40:38
