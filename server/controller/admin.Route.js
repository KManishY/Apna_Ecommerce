export const adminControllerFn= async (req, res) => {
	const { name, email, password } = req.body;
	bcrypt.hash(password, 5, async (err, hash) => {
		if (err) {
			return res.status(504).json("some error in while storing password");
		}
		const user = new AdminAuthModel({
			name,
			email,
			password: hash
		});
		try {
			await user.save();
			res.status(200).send({ message: "Registerd Successful" });
		} catch (err) {
			res.status(502).send({ message: "Already Registered" });
			// console.log("err: ", err);
		}
	});
}