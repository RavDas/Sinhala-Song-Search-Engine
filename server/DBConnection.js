const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
  auth: { username: "elastic", password: "IsZ16EqL3-iJaM261Mj3" },
});

const SourceMetaphorSearch = async (phrase) => {
  var size = 10;

  const searchResult = await client.search({
    index: "sinhalasongsdatabase",
    _source_includes:
      "Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
    body: {
      size: size,
      query: {
        nested: {
          path: "Metaphors",
          query: {
            match: { "Metaphors.Source": phrase },
          },
          inner_hits: {},
        },
      },
    },
  });

  console.log(searchResult.hits.hits.length);

  return {
    success: 1,
    data: searchResult,
  };
};

/*const SrcmetaphorSearchWithType = async (phrase,type) => {
  const hits = [];
  var size = 50;

  const searchResult = await client
    .search({
      index: "sinhalasongsdatabase",
      _source_includes:"singer,lyricist,composer,year,lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "metaphors",
            query: {
              bool: {
                must: [
                  { match: { "metaphors.source_domain": phrase }},
                  { match_phrase: { "metaphors.type":  type}} 
                ]
              }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

  return {
    success: 1,
    data:searchResult,
  };
};*/

const TargetMetaphorSearch = async (phrase) => {
  const hits = [];
  var size = 10;

  const searchResult = await client.search({
    index: "sinhalasongsdatabase",
    _source_includes:
      "Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
    body: {
      size: size,
      query: {
        nested: {
          path: "Metaphors",
          query: {
            match: { "Metaphors.Target": phrase },
          },
          inner_hits: {},
        },
      },
    },
  });

  return {
    success: 1,
    data: searchResult,
  };
};

/*const TgtmetaphorSearchWithType = async (phrase,type) => {
  const hits = [];
  var size = 50;
  
  const searchResult = await client
    .search({
      index: "sinhalasongsdatabase",
      _source_includes:"singer,lyricist,composer,year,lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "metaphors",
            query: {
              bool: {
                must: [
                  { match: { "metaphors.target_domain": phrase }},
                  { match_phrase: { "metaphors.type":  type}} 
                ]
              }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

  return {
    success: 1,
    data:searchResult,
  };
};*/

const PartialSourceAutoComplete = async (phrase) => {
  const hits = [];
  // only string values are searchable
  const searchResult = await client.search({
    index: "sinhalasongsdatabase",
    _source_includes:
      "Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
    body: {
      query: {
        nested: {
          path: "Metaphors",
          query: {
            match_bool_prefix: { "Metaphors.Source": phrase },
          },
          inner_hits: {},
        },
      },
    },
  });

  if (searchResult.hits.total.value < 1) {
    out = {
      success: 1,
      data: [],
    };
  } else {
    out_list = [];
    obj_list = searchResult.hits.hits;

    for (let i = 0; i < obj_list.length; i++) {
      obj = obj_list[i];
      met_obj = obj.inner_hits.Metaphors.hits.hits[0];
      out_list.push(met_obj._source.Source);
    }
    uniqe_list = [...new Set(out_list)];
    out = {
      success: 1,
      data: uniqe_list,
    };
  }
  return out;
};

const PartialTargetAutoComplete = async (phrase) => {
  const hits = [];
  // only string values are searchable
  const searchResult = await client.search({
    index: "sinhalasongsdatabase",
    _source_includes:
      "Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
    body: {
      query: {
        nested: {
          path: "Metaphors",
          query: {
            match_bool_prefix: { "Metaphors.Target": phrase },
          },
          inner_hits: {},
        },
      },
    },
  });

  if (searchResult.hits.total.value < 1) {
    out = {
      success: 1,
      data: [],
    };
  } else {
    out_list = [];
    obj_list = searchResult.hits.hits;

    for (let i = 0; i < obj_list.length; i++) {
      obj = obj_list[i];
      met_obj = obj.inner_hits.Metaphors.hits.hits[0];
      out_list.push(met_obj._source.Target);
    }
    uniqe_list = [...new Set(out_list)];
    out = {
      success: 1,
      data: uniqe_list,
    };
  }
  return out;
};

const OtherFieldSearch = async (phrase, field) => {
  var size = 10;
  query_obj = {};
  query_obj[field] = phrase;
  const searchResult = await client.search({
    index: "sinhalasongsdatabase",
    _source_includes:
      "Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics,Metaphors",
    body: {
      size: size,
      query: {
        match: query_obj,
      },
    },
  });

  console.log(searchResult.hits.hits.length);

  return {
    success: 1,
    data: searchResult,
  };
};

module.exports = {
  SourceMetaphorSearch,
  //SrcmetaphorSearchWithType,
  TargetMetaphorSearch,
  //TgtmetaphorSearchWithType,
  PartialSourceAutoComplete,
  PartialTargetAutoComplete,
  OtherFieldSearch,
};
