import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { User, RepoResponse, Repository } from "../types/github";
import RepoList from "./RepoList";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const [repoData, setRepoData] = useState<RepoResponse>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState<boolean>(true); //loading state
  const [error, setError] = useState<string | null>(null);//error state

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${id}`);
      if (!response.ok) {
        throw new Error("Error fetching user data");//throw an error if the response is not ok
      }
      const data = await response.json();
      setUserData(data);
    } catch (error: any) {
      setError(error.message);//set the error message
    } finally {
      setLoading(false);
    }//set loading to false
  };

  const fetchRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${id}/repos`);//fetch the repos
      if (!response.ok) {
        throw new Error("Error fetching repos");//throw an error if the response is not ok
      }
      const data = await response.json();
      setRepoData(data);
    } catch (error: any) {
      setError(error.message);//set the error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchRepos();
  }, [id]);

  if (loading) {//if loading is true
    return (//return a circular progress
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {//if there is an error
    return (//return the error message
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#303030",
        padding: "0 20px",
        color: "white",
      }}
    >
      <div
      //display user data
        style={{
          padding: "12px",
          height: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Avatar src={userData?.avatar_url} sx={{ width: 100, height: 100 }} />{/*display the user avatar*/}
        <Typography variant="h5">{userData?.name}</Typography>{/*display the user name*/}
        <Typography variant="h6">followers: {userData?.followers}</Typography>{/*display the number of followers*/}
        <Typography variant="h6">following: {userData?.following}</Typography>{/*display the number of following*/}
      </div>
      {/*display the repo list*/}
      <RepoList
        repos={repoData}
        selectedRepo={selectedRepo}
        onSelectRepo={setSelectedRepo}
      />
      <div style={{ padding: "12px", height: "100%" }}>
        <Typography variant="h5">{selectedRepo?.name}</Typography>
        <Typography variant="h6">{selectedRepo?.description}</Typography>
        <Typography variant="h6">
          stars: {selectedRepo?.stargazers_count}
        </Typography>
        <Typography variant="h6">forks: {selectedRepo?.forks_count}</Typography>
      </div>
    </Box>
  );
};

export default Profile;