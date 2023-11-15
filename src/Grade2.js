import React, {Component} from "react";
import "./Grade.css"

class Grade2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            newSubject: {
                이수: '교양',
                필수: '선택',
                name: '',
                학점: '1',
                출석점수: '',
                과제점수: '',
                중간고사: '',
                기말고사: '',
            },
            totalSum: {
                학점: 0,
                출석점수: 0,
                과제점수: 0,
                중간고사: 0,
                기말고사: 0,
                총점: 0,
            },
        };
    }

    handleInputChange2 = (event, index) => {
        const { name, value } = event.target;
        const updatedSubjects = [...this.state.subjects];

        if (name === 'name' && updatedSubjects.some((subject) => subject.name === value)) {
            alert('이미 동일한 과목이 있습니다. 다른 과목을 추가해주세요.');
            return;
        }

        if (index === -1) {
            const newSubject = { ...this.state.newSubject, [name]: value };
            this.setState({ newSubject });
        } else {
            updatedSubjects[index][name] = value;
            this.setState({ subjects: updatedSubjects });
        }
    };

    handleAddSubject2 = () => {
        const { subjects, newSubject } = this.state;
        const isDuplicate = subjects.some((subject) => subject.name === newSubject.name);

        if (isDuplicate) {
            alert('이미 동일한 과목이 있습니다. 다른 과목을 추가해주세요.');
            return;
        }

        const updatedSubjects = [...subjects, { ...newSubject }];
        this.setState({
            subjects: updatedSubjects,
            newSubject: {
                이수: '교양',
                필수: '선택',
                name: '',
                학점: '1',
                출석점수: '',
                과제점수: '',
                중간고사: '',
                기말고사: '',
            },
        });
    };

    handleToggleCheck2 = (index) => {
        const updatedSubjects = [...this.state.subjects];
        updatedSubjects[index].checked = !updatedSubjects[index].checked;
        this.setState({ subjects: updatedSubjects });
    };

    handleDeleteSubjects2 = () => {
        const { subjects } = this.state;
        const updatedSubjects = subjects.filter((subject) => !subject.checked);
        this.setState({ subjects: updatedSubjects });
    };

    calculateAverageGrade2 = () => {
        const { subjects } = this.state;

        const filteredSubjects = subjects.filter((subject) => subject.학점 !== '1');

        if (filteredSubjects.length === 0) {
            return 0;
        }

        const totalScoreSum = filteredSubjects.reduce((acc, subject) => acc + subject.총점, 0);
        const averageScore = (totalScoreSum / filteredSubjects.length).toFixed(2);

        return averageScore;
    };

    calculateGrade2 = (averageScore) => {
        if (averageScore > 95) return 'A+';
        else if (averageScore > 90) return 'A0';
        else if (averageScore > 85) return 'B+';
        else if (averageScore > 80) return 'B0';
        else if (averageScore > 75) return 'C+';
        else if (averageScore > 70) return 'C0';
        else if (averageScore > 65) return 'D+';
        else if (averageScore > 60) return 'D0';
        else return 'F';
    };

    handleSave2 = () => {
        const { subjects } = this.state;
        let inputError = false;

        subjects.forEach((subject) => {
            const attendanceScore = parseFloat(subject.출석점수);
            const assignmentScore = parseFloat(subject.과제점수);
            const midtermScore = parseFloat(subject.중간고사);
            const finalScore = parseFloat(subject.기말고사);

            if (!/^[0-9]*$/.test(subject.학점) || subject.학점 < 1 || subject.학점 > 3) {
                inputError = true;
                alert('학점은 1에서 3 사이어야 합니다.');
            }

            if (!/^[0-9]*$/.test(subject.출석점수) || subject.출석점수 < 0 || subject.출석점수 > 20) {
                inputError = true;
                alert('출석점수는 0에서 20 사이어야 합니다.');
            }

            if (!/^[0-9]*$/.test(subject.과제점수) || subject.과제점수 < 0 || subject.과제점수 > 20) {
                inputError = true;
                alert('과제점수는 0에서 20 사이어야 합니다.');
            }

            if (
                (!/^[0-9]*$/.test(subject.중간고사) || subject.중간고사 < 0 || subject.중간고사 > 30) ||
                (!/^[0-9]*$/.test(subject.기말고사) || subject.기말고사 < 0 || subject.기말고사 > 30)
            ) {
                inputError = true;
                alert('중간/기말고사는 0에서 30 사이어야 합니다.');
            }

            if (subject.학점 === '1') {
                subject.성적 = 'P';
            } else {
                const totalScore = attendanceScore + assignmentScore + midtermScore + finalScore;
                subject.총점 = totalScore;

                if (totalScore < 0 || totalScore > 100) {
                    inputError = true;
                    alert('총점은 0에서 100 사이어야 합니다.');
                }

                if (totalScore > 95) subject.성적 = 'A+';
                else if (totalScore > 90) subject.성적 = 'A0';
                else if (totalScore > 85) subject.성적 = 'B+';
                else if (totalScore > 80) subject.성적 = 'B0';
                else if (totalScore > 75) subject.성적 = 'C+';
                else if (totalScore > 70) subject.성적 = 'C0';
                else if (totalScore > 65) subject.성적 = 'D+';
                else if (totalScore > 60) subject.성적 = 'D0';
                else subject.성적 = 'F';
            }
        });

        const isEmptySubjectName = subjects.some((subject) => subject.name.trim() === '');
        if (isEmptySubjectName) {
            inputError = true;
            alert('과목명을 입력하세요.');
        }

        if (inputError) {
            return;
        }

        const sortedSubjects = subjects.slice().sort((a, b) => {
            if (a.이수 !== b.이수) {
                return a.이수.localeCompare(b.이수);
            } else if (a.필수 !== b.필수) {
                return a.필수.localeCompare(b.필수);
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        const totalSum = subjects.reduce(
            (acc, subject) => {
                if (subject.학점 !== '1') {
                    return {
                        학점: acc.학점 + parseFloat(subject.학점),
                        출석점수: acc.출석점수 + parseFloat(subject.출석점수),
                        과제점수: acc.과제점수 + parseFloat(subject.과제점수),
                        중간고사: acc.중간고사 + parseFloat(subject.중간고사),
                        기말고사: acc.기말고사 + parseFloat(subject.기말고사),
                        총점: acc.총점 + subject.총점,
                    }
                } else {
                    acc.학점 += 1;
                }
                return acc;
            },
            {
                학점: 0,
                출석점수: 0,
                과제점수: 0,
                중간고사: 0,
                기말고사: 0,
                총점: 0,
            }
        );

        this.setState({
            subjects: sortedSubjects,
            totalSum,
        });
    };

    render() {
        const { newSubject, subjects, totalSum } = this.state;

        return (
            <div>
                <div className="Grade2">
                    <h1>2학년</h1>
                    <div className="button2">
                        <button className="btn2-1" onClick={this.handleAddSubject2}>추가</button>
                        <button className="btn2-2" onClick={this.handleSave2}>저장</button>
                        <button className="btn2-3" onClick={this.handleDeleteSubjects2}>삭제</button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>이수</th>
                            <th>필수</th>
                            <th>과목명</th>
                            <th>학점</th>
                            <th>출석점수</th>
                            <th>과제점수</th>
                            <th>중간고사</th>
                            <th>기말고사</th>
                            <th>총점</th>
                            <th>평균</th>
                            <th>성적</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="checked"
                                        checked={subject.checked || false}
                                        onChange={() => this.handleToggleCheck2(index)}
                                    />
                                </td>
                                <td>
                                    <select
                                        name="이수"
                                        value={subject.이수}
                                        onChange={(event) => this.handleInputChange2(event, index)}
                                    >
                                        <option value="교양">교양</option>
                                        <option value="전공">전공</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        name="필수"
                                        value={subject.필수}
                                        onChange={(event) => this.handleInputChange2(event, index)}
                                    >
                                        <option value="필수">필수</option>
                                        <option value="선택">선택</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        value={subject.name}
                                        onChange={(event) => this.handleInputChange2(event, index)}
                                    />
                                </td>
                                <td>
                                    <select
                                        name="학점"
                                        value={subject.학점}
                                        onChange={(event) => this.handleInputChange2(event, index)}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </td>
                                        <td>
                                            {subject.학점 !== '1' && (
                                            <input
                                                type="number"
                                                name="출석점수"
                                                value={subject.출석점수}
                                                onChange={(event) => this.handleInputChange2(event, index)}
                                            />
                                                )}
                                        </td>
                                        <td>
                                            {subject.학점 !== '1' && (
                                            <input
                                                type="number"
                                                name="과제점수"
                                                value={subject.과제점수}
                                                onChange={(event) => this.handleInputChange2(event, index)}
                                            />
                                                )}
                                        </td>
                                        <td>
                                            {subject.학점 !== '1' && (
                                            <input
                                                type="number"
                                                name="중간고사"
                                                value={subject.중간고사}
                                                onChange={(event) => this.handleInputChange2(event, index)}
                                            />
                                                )}
                                        </td>
                                        <td>
                                            {subject.학점 !== '1' && (
                                            <input
                                                type="number"
                                                name="기말고사"
                                                value={subject.기말고사}
                                                onChange={(event) => this.handleInputChange2(event, index)}
                                            />
                                                )}
                                        </td>
                                <td>{subject.총점}</td>
                                <td></td>
                                <td style={{ color: subject.성적 === 'F' ? 'red' : 'black' }}>
                                    {subject.학점 === '1' ? 'P' : subject.성적}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="4">합계</td>
                            <td>{totalSum.학점}</td>
                            <td>{totalSum.출석점수}</td>
                            <td>{totalSum.과제점수}</td>
                            <td>{totalSum.중간고사}</td>
                            <td>{totalSum.기말고사}</td>
                            <td>{totalSum.총점}</td>
                            <td>{this.calculateAverageGrade2()}</td>
                            <td style={{ color: this.calculateGrade2(this.calculateAverageGrade2()) === 'F' ? 'red' : 'black' }}>
                                {this.calculateGrade2(this.calculateAverageGrade2())}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default Grade2;
