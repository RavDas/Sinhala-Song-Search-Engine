import React, { ReactElement, useState } from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";

export default function BadgeEarn({ showModal, setShowModal, Song }) {
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      zIndex: 999,
    },
    content: {
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0px",
      border: "0px",
      backgroundColor: "transparent",
      zIndex: 999,
    },
  };

  return (
    <div>
      {Song && (
        <Modal isOpen={showModal} style={customStyles} ariaHideApp={false}>
          <>
            <div className="flex-shrink justify-center  items-center flex  fixed inset-0 z-50 outline-none focus:outline-none">
              <div style={{ width: "60%" }} className="relative my-6  mx-auto">
                {/* content */}
                <div
                  className="absolute z-50 top-6 right-6 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  <AiFillCloseCircle />
                </div>
                <div
                  className="border-2  rounded-lg shadow-lg relative  items-center w-full bg-white outline-none focus:outline-none p-6"
                  style={{ maxHeight: "656px" }}
                >
                  <div className="mt-4 flex ">
                    <div className="w-1/2 text-center text-gray-600 font-bold">
                      Song
                    </div>
                    <div className="w-1/2 text-center text-gray-600 font-bold">
                      Artist
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="w-1/2 text-center font-semibold">{`${Song._source.Title_En}(${Song._source.Title_Si})`}</div>
                    <div className="w-1/2 text-center font-semibold">{`${Song._source.Artist_En}(${Song._source.Artist_Si})`}</div>
                  </div>
                  <div className="mt-4 flex ">
                    <div className="w-1/2 text-center text-gray-600 font-bold">
                      Lyricist
                    </div>
                    <div className="w-1/2 text-center text-gray-600 font-bold">
                      Year
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="w-1/2 text-center font-semibold">{`${Song._source.Lyricist_En}(${Song._source.Lyricist_Si})`}</div>
                    <div className="w-1/2 text-center font-semibold">
                      {Song._source.Year}
                    </div>
                  </div>
                  <div className="text-center text-gray-600 font-bold">
                    Lyrics
                  </div>
                  <div className="text-center font-semibold">
                    {Song._source.Lyrics}
                  </div>
                  {Song._source.Metaphors.map((met) => (
                    <div>
                      <div className="mt-4 flex ">
                        <div className="w-1/2 text-center text-gray-600 font-bold">
                          Metaphor
                        </div>
                        <div className="w-1/2 text-center text-gray-600 font-bold">
                          Source
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-1/2 text-center font-semibold">{met.Metaphor}</div>
                        <div className="w-1/2 text-center font-semibold">{met.Source}</div>
                      </div>
                      <div className="mt-4 flex ">
                        <div className="w-1/2 text-center text-gray-600 font-bold">
                          Meaning
                        </div>
                        <div className="w-1/2 text-center text-gray-600 font-bold">
                          Target
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-1/2 text-center font-semibold">{met.Meaning}</div>
                        <div className="w-1/2 text-center font-semibold">{met.Target}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
}
