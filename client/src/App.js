import "./App.css";
import React, { Component, useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import Axios from "axios";

import Songcard from "./components/songcard";
import SongModal from "./components/songModal";

function App() {
  const [searchkey, setSearchkey] = useState("");
  const [selectedField, setSelectedField] = useState({
    id: "Lyrics",
    val: "Song Lyrics",
  });

  const [selectedSong, setSelectedSong] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [songList, setSongList] = useState([]);

  const Options = [
    { id: "Source", val: "Metaphors Source" },
    { id: "Target", val: "Metaphors Target" },
    { id: "Title_En", val: "Song Title in English" },
    { id: "Title_Si", val: "Song Title in Sinhala" },
    { id: "Artist_En", val: "Artist Name in English" },
    { id: "Artist_Si", val: "Artist Name in Sinhala" },
    { id: "Year", val: "Year of the song" },
    { id: "Lyricist_En", val: "Lyricist Name in English" },
    { id: "Lyricist_Si", val: "Lyricist Name in Sinhala" },
    { id: "Lyrics", val: "Song Lyrics" },
  ];

  const sendQuery = () => {
    if (selectedField.id == "Source") {
      Axios.post("http://localhost:3001/srcsearchmetaphor", {
        query: searchkey,
      }).then(
        (response) => {
          setSongList(response.data.data);
          //console.log(response.data.data.hits.hits);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (selectedField.id == "Target") {
      Axios.post("http://localhost:3001/tgtsearchmetaphor", {
        query: searchkey,
      }).then(
        (response) => {
          setSongList(response.data.data);
          //console.log(response.data.data.hits.hits);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Axios.post("http://localhost:3001/otherfieldsearch", {
        query: searchkey,
        field: selectedField.id,
      }).then(
        (response) => {
          setSongList(response.data.data?.hits?.hits);
          //console.log(response.data.data.hits.hits);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  document.body.style = "background: #334155;";
  return (
    <div className="App">
      <div className="text-yellow-300 font-bold text-5xl">
        2000-2015 Sinhala Hit Songs
      </div>
      <div>
        <div className="flex justify-row mt-4">
          <div className="w-1/3 flex justify-end">
            <div
              className={`flex flex-col  my-1.5 w-3/4 ${
                dropdownVisible && "h-60"
              }`}
            >
              <div
                className={`rounded-md flex relative cursor-pointer items-center focus:outline-none w-full md:w-3/4 md:p-2 border-2 text-sm focus:border-blue-900 border-gray-300`}
              >
                <div
                  className="flex justify-between w-full"
                  onClick={() => setDropdownVisible(true)}
                >
                  <div className="text-white font-medium pl-2">
                    {selectedField.val}
                  </div>
                  <div className="">
                    <div className="flex flex-col">
                      <HiChevronUp className="mr-2 -mb-2" fill="white" />
                      <HiChevronDown className="mr-2" fill="white" />
                    </div>
                  </div>
                </div>
                {dropdownVisible ? (
                  <ul
                    className="absolute w-full cursor-pointer pl-0 top-10 left-0 z-10 rounded-md shadow-md py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    onMouseLeave={() => setDropdownVisible(false)}
                  >
                    {Options.map((opt) => (
                      <div
                        className="p-2 pl-2 hover:bg-gray-200 "
                        key={opt.id}
                        onClick={() => {
                          setSelectedField(opt);
                          setDropdownVisible(false);
                        }}
                      >
                        {opt.val}
                      </div>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-3/4 flex justify-start">
            <input
              className="h-10 w-2/3 text-center rounded-lg mt-2"
              value={searchkey}
              placeholder="🔍 Search top sinhala songs"
              onChange={(e) => {
                setSearchkey(e.target.value);
              }}
            />
            <button
              onClick={sendQuery}
              className="rounded-md bg-blue-300 h-10 px-2 m-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {songList.map((Song) => (
        <div
          onClick={() => {
            setShowModal(true);
            setSelectedSong(Song);
          }}
        >
          <Songcard Song={Song} />
        </div>
      ))}
      <SongModal
        showModal={showModal}
        setShowModal={setShowModal}
        Song={selectedSong}
      />
    </div>
  );
}

export default App;
