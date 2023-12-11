import React from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../App";
import petitionCard from "../components/Petition";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  // Fetch and display search results based on the query

  const petitions = supabase.from("petitions").select("*").ilike("description", query);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      
    </div>
  );
};

export default SearchResults;