import { type ActionFunctionArgs, json } from "@remix-run/node";
import { themeCookie } from "~/utils/theme-cookie";
// Get form data from the request
// And convert it to the Object
// And then returning the success response, and change the cookie

// await prefs.serialize(cookie)

export const action = async ({ request }: ActionFunctionArgs) => {
	// get new cookie data from the request
	// And then send back to the client with response Set-Cookie header
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	return json(
		{ message: "success" },
		{
			headers: {
				"Set-Cookie": await themeCookie.serialize(data.theme),
			},
		},
	);
};
