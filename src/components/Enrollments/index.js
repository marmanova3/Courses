
export function Enroll(user, course, firebase) {
    firebase.enrollments()
        .add({
            user: user,
            courseInstance: course
        })
}

export function isEnrolledIn(user, course, firebase) {
    firebase.enrollments()
        .add({
            user: user,
            courseInstance: course
        })
        .then(() => {
            return true;
        });
}
