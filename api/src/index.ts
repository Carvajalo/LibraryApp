import app from "./app";
import "./database"

app.listen(app.get("PORT"), () => {
  console.log(`server running on http://localhost:${app.get("PORT")}`);
});
