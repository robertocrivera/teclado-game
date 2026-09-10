class Player {
  constructor(name = "Explorador", age = 6) {
    this.name = name;
    this.age = age;
    this.avatar = "assets/images/avatar_robot.png";
    this.score = 0;
  }

  addScore(points) {
    this.score += points;
  }

  setAvatar(avatarPath) {
    this.avatar = avatarPath;
  }
}