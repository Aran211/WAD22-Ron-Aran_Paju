<template>
  <div>
    <h3> My Courses </h3>
    <div class="container">
      <table>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Semester</th>
            <th>Homeworks</th>
            <th>Exam</th>
            <th>Grade</th>
          </tr>
          <tr class="item" v-for="course in coursesWithGrades" :key="course.id">
            <td @click="showdescription(course.id)" class="code">{{ course.code }} </td>
            <td>{{ course.title}} </td>
            <td>{{ course.semester }} </td>
            <td>{{ course.homeworks }} </td> 
            <td :class="{'fail': course.exam < 21}" >{{ course.exam }}</td>
            <td :class="{'fail': course.grade < 51}" >{{ course.grade }}</td>
          </tr>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCourses",
  data() {
    return {
      courses: [],
      courseDescription: ''
    };
  },
  methods: {
    fetchCourses() {
      fetch(`/api/mycourses/`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
    },
    showDescription(courseId) {
      fetch(`/api/courses/${courseId}/description`)
        .then((response) => response.json())
        .then((data) => (this.courseDescription = data.description))
        .catch((err) => console.log(err.message));
    }
  },
  computed: {
    coursesWithGrades() {
        return this.courses.map(course => {
            course.grade = course.homeworks + course.exam;
            return course;
        });
    }
  },
  mounted() {
    this.fetchCourses();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
th {
  background: rgb(100, 151, 122);
}
td {
  background: rgb(186, 228, 204);
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
}
.fail {
  background-color: red;
  color: white;
}
.code-hover:hover {
  background-color: #f5f5f5;
}
.course-description {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>