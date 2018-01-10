CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` ENUM('Passanger', 'dispatcher', 'driver') NOT NULL,
  `phoneNumber` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `zip` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` char(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `role`, `lastName`, `phoneNumber`, `address`, `city`, `zip`, `email`, `password`, `salt`) VALUES
(1, 'Brett', 'Lamy', 'dispatcher', 2035254835, '59 Werner Park', 'Rochester, Ny', 14620, 'bel9708@g.rit.edu', '$2y$10$TDAwo5v.lcakEOL.ibMRK.G5oTGBPYEmQtMTvm/Bvn1pHsgUfu3r.', '4&3vF');
