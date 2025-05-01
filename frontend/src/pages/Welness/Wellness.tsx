import { useState, useRef, useEffect } from "react";

const Wellness = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null); // Added type for audioRef
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const musicTracks = [
    {
      id: 2,
      title: "Meditation Music",
      artist: "Zen Master",
      duration: "8:45",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
      cover: "https://source.unsplash.com/random/300x300/?meditation,yoga",
    },
    {
      id: 1,
      title: "Calming Ocean Waves",
      artist: "Nature Sounds",
      duration: "5:32",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
      cover: "https://source.unsplash.com/random/300x300/?ocean,water",
    },
    {
      id: 3,
      title: "Forest Ambience",
      artist: "Nature Sounds",
      duration: "6:18",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
      cover: "https://source.unsplash.com/random/300x300/?forest,trees",
    },
    {
      id: 3,
      title: "vibe Ambience",
      artist: "Nature Sounds",
      duration: "6:18",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      cover: "https://source.unsplash.com/random/300x300/?forest,trees",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "5-Minute Breathing Exercise",
      description:
        "Follow this simple breathing pattern to reduce stress: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat for 5 minutes.",
      duration: "5 min",
      icon: "🧘",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: 2,
      title: "Quick Stretch Routine",
      description:
        "Stand up and stretch your arms overhead, then bend to each side. Roll your shoulders and neck gently. Perfect for a quick break!",
      duration: "3 min",
      icon: "🤸",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      id: 3,
      title: "Gratitude Journaling",
      description:
        "Write down 3 things you're grateful for today. Focusing on positive aspects can significantly improve your mood.",
      duration: "5 min",
      icon: "📝",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      id: 4,
      title: "Laughing Exercise",
      description:
        "Force yourself to laugh for 30 seconds. Even fake laughter can trigger endorphins and improve your mood!",
      duration: "1 min",
      icon: "😂",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
  ];

  // Handle play/pause and track changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Update progress bar and handle volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateProgress = () => {
      const duration = audio.duration || 1;
      const currentTime = audio.currentTime || 0;
      setProgress((currentTime / duration) * 100);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack(
      (prev) => (prev - 1 + musicTracks.length) % musicTracks.length
    );
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const percentageClicked = (clickPosition / progressBarWidth) * 100;
    const newTime = (percentageClicked / 100) * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
    setProgress(percentageClicked);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const startActivity = (activity: any) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Wellness Center
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Relax, recharge, and find your balance with our music and activities
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Music Player Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Relaxing Music
            </h2>
            <div className="flex flex-col items-center">
              <img
                src={musicTracks[currentTrack].cover}
                alt="Album cover"
                className="w-48 h-48 rounded-lg object-cover mb-6 shadow-md"
              />
              <div className="w-full text-center mb-4">
                <h3 className="text-xl font-medium text-gray-800 dark:text-white">
                  {musicTracks[currentTrack].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {musicTracks[currentTrack].artist}
                </p>
              </div>

              <div className="w-full mb-4">
                <div
                  className="h-2 bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-purple-500 rounded-full dark:bg-purple-400"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    {audioRef.current
                      ? formatTime(audioRef.current.currentTime)
                      : "0:00"}
                  </span>
                  <span>{musicTracks[currentTrack].duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6 mb-4">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  aria-label="Previous track"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  aria-label="Next track"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Volume Control */}
              <div className="w-full max-w-xs flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={musicTracks[currentTrack].source}
              preload="metadata"
            />
          </div>

          {/* Activities Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Quick Wellness Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => startActivity(activity)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${activity.bgColor} border-gray-200 dark:border-gray-700`}
                >
                  <div className="flex items-start">
                    <span className="text-3xl mr-3">{activity.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.duration} • Tap to start
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full dark:bg-gray-800 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {selectedActivity.title}
              </h3>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close activity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center text-7xl my-6 animate-bounce">
              {selectedActivity.icon}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {selectedActivity.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Duration: {selectedActivity.duration}
              </span>
              <button
                onClick={() => setShowActivityModal(false)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 transition-colors"
              >
                I've completed this
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;
