const client = require("../redis-client");
const init = async () => {
   const result = await client.get("name");
   await client.set("product:5","shower gel");
   console.log(result)
}
init();