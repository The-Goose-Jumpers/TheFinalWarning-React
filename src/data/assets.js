const SCENES_BASE_PATH = `${process.env.PUBLIC_URL}/images/Scenes`;
const MUSIC_BASE_PATH = `${process.env.PUBLIC_URL}/images/Music`;
const MUSIC_BUTTON_BASE_PATH = `${process.env.PUBLIC_URL}/images/UI`;

const Scenes = {
  LivingRoom: `${SCENES_BASE_PATH}/LivingRoom.png`,
  Driving: `${SCENES_BASE_PATH}/driving.png`,
  FrontDoor: `${SCENES_BASE_PATH}/frontdoor.jpg`,
  Outside: `${SCENES_BASE_PATH}/outside.png`,
  Outside2: `${SCENES_BASE_PATH}/outside2.png`,
  FriendsHouse: `${SCENES_BASE_PATH}/friendshouse.png`,
  GasStation: `${SCENES_BASE_PATH}/gasStation.png`,
  Hotel: `${SCENES_BASE_PATH}/hotelsign.jpg`,
  Shelter: `${SCENES_BASE_PATH}/shelter.jpg`,
  GoodEndEvacuacaoRIP: `${SCENES_BASE_PATH}/goodendEvacuacaorip.png`,
  BadEndEvacuacao: `${SCENES_BASE_PATH}/badendEvacuacao.png`,
  BadEndStay: `${SCENES_BASE_PATH}/badendStay.png`,
  GoodEnd: `${SCENES_BASE_PATH}/goodend.jpg`,
  BadEndFlood: `${SCENES_BASE_PATH}/badEndFlooding.jpg`,
  GoodEndFlood: `${SCENES_BASE_PATH}/goodEndFlooding.jpg`,
};

const Music = {
  Gameplay: `${MUSIC_BASE_PATH}/GameplaySong.ogg`,
  GameOver: `${MUSIC_BASE_PATH}/GameOverSong.ogg`,
  IntroAnimation: `${MUSIC_BASE_PATH}/IntroAnimation.ogg`,
  MainMenuSong: `${MUSIC_BASE_PATH}/MainMenuSong.ogg`,
  TurnOff: `${MUSIC_BUTTON_BASE_PATH}/MusicOff.svg`,
  TurnOn: `${MUSIC_BUTTON_BASE_PATH}/MusicOn.svg`,
  Click: `${MUSIC_BASE_PATH}/click-button.mp3`,
}

export { Scenes, Music };