import Sidebar from "./components/Sidebar";
import { Tweet } from "./components/Tweet";
import { TwitterForm } from "./components/TwitterForm";
import { v4 } from "uuid";
import { getAvatar, getRandomImage } from "./utils/generateImages";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TrendItem } from "./components/TrendItem";
import { FollowItem } from "./components/FollowItem";

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      addNewRandomTweets();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addNewRandomTweets = () => {
    const randowTwerts = [
      "Tem dias que a motivação vem. Tem outros que a gente vai sem ela mesmo.",
      "Talvez a resposta seja dormir... ou um café. Ainda estou decidindo.",
      "Atualizações do sistema: continuo cansado, porém estiloso.",
      "Às vezes tudo o que você precisa é de 8 horas de sono e 12 horas de paz.",
      "Fiz planos. A vida riu. Agora estamos improvisando juntos",
    ];

    const randomTweet =
      randowTwerts[Math.floor(Math.random() * randowTwerts.length)];

    addNewTweet(randomTweet, Math.random() > 0.7);
  };

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  const addNewTweet = (content, includeImage = false) => {
    const newTweet = {
      id: v4(),
      name: "User",
      username: `user${Math.floor(Math.random() * 1000)}`,
      avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`),
      content,
      time: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0,
    };

    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  };

  return (
    <div className="flex mx-auto max-w-7xl">
      <Sidebar />
      <main className="flex-grow border-l border-r border-gray-700 max-w-xl">
        <header className="sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm">
          <h2 className="px-4 py-3 text-xl font-bold">For you</h2>
        </header>

        <TwitterForm
          onTweet={(content) => addNewTweet(content, Math.random() > 0.6)}
        />
        <div>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>
      <aside className="hidden xl:block w-80 px-4">
        <div className="sticky top-0 pt-2">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-500" />
            <input type="text" placeholder="Search Twitter" className="w-full bg-gray-800 text-white rounded-full outline-none py-2 pl-10 pr-4" />
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Subscribe to Premium</h2>
            <p className="text-gray-500 mb-4 ">Subscribe to unlock new features and if aligible, receive a chare of ads revenue.</p>
            <button className="bg-twitter-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">Subscribe</button>
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">What's Happening</h2>
            <TrendItem category="NFL - LIVE" name="Cardinals al Bills" TweetCount="7,034" />
            <TrendItem category="Sports - Trending" name="Cardinals al Bills" TweetCount="13,000"/>
            <TrendItem category="Sports - Trending" name="Anthony Richardson" TweetCount="5,888"/>
            <TrendItem category="Sports - Trending" name="Bryce Young" TweetCount="5,888" />
            <TrendItem category="Sports - Trending" name="Daboll" TweetCount="1,345" />
            
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Who to Follow</h2>
            <FollowItem name="Bill Gates" username= "BillGates" />
            <FollowItem name="Will Smith" username= "WillSmith" />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
