
export function Enroll(user, course, firebase) {
    firebase.enrollments()
        .add({
            user: user,
            courseInstance: course
        })
}

export async function isEnrolledIn(user, course, firebase) {
    return await firebase.enrollments().where("user", "==", user, )
        .get()
        .then(() => {
            return true;
        });
}
