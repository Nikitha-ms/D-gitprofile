import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { RepoListProps } from "../types/github"; //import the RepoListProps type



const RepoList: React.FC<RepoListProps> = ({ repos, selectedRepo, onSelectRepo }) => {
  return (
    <div
      style={{
        padding: "12px",
        width: "20%",
        height: "100vh",
        flexShrink: 0,
      }}
    >
      <Typography variant="h5">Repositories</Typography>
      <List
        sx={{
          width: "100%",
          padding: "0 12px",
          height: "90vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            outline: "1px solid slategrey",
          },
        }}
      >
        {repos.map((repo) => (
          <ListItem
            key={repo.name}
            onClick={() => onSelectRepo(repo)}
            sx={{
              color: selectedRepo?.name === repo.name ? "#fff" : "#888",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            <ListItemText primary={repo.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RepoList;