import React from "react";

function Songcard({ Song }) {
  return (
    <div className="pt-2 mx-4 my-1 bg-slate-500 rounded-xl border border-yellow-100  px-6 h-28 text-white  hover:bg-slate-400 hover:text-black">
      <div className="flex justify-between">
        <div className="w-1/4 font-semibold text-2xl">Song Title</div>
        <div className="w-1/4 font-semibold text-2xl">Artist</div>
        <div className="w-1/4 font-semibold text-2xl">Lyricist</div>
        <div className="w-1/4 font-semibold text-2xl">Year</div>
      </div>
      <div className="flex justify-between text-black">
        <div className="w-1/4 text-2xl">{Song._source.Title_Si}</div>
        <div className="w-1/4 text-2xl">{Song._source.Artist_Si}</div>
        <div className="w-1/4 text-2xl">{Song._source.Lyricist_Si}</div>
        <div className="w-1/4 text-2xl">{Song._source.Year}</div>
      </div>
    </div>
  );
}

export default Songcard;
