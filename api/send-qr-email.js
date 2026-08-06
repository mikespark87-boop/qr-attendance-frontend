import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, qrCode, attendeeName } = req.body;

  // 디버깅: 환경변수 확인
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'exists' : 'NOT FOUND');
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'exists' : 'NOT FOUND');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return res.status(500).json({
      error: '환경변수가 설정되지 않았습니다. Vercel에서 EMAIL_USER와 EMAIL_PASSWORD를 설정하세요.',
      envVars: {
        EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING'
      }
    });
  }

  try {
    // 환경변수에서 이메일 설정 가져오기
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `[타운홀 미팅] ${attendeeName}님의 QR 코드`,
      html: `
        <h2>타운홀 미팅 참여 QR 코드</h2>
        <p>${attendeeName}님, 안녕하세요!</p>
        <p>타운홀 미팅에 참석해주셔서 감사합니다.</p>
        <p>아래는 퀴즈 참여에 필요한 QR 코드입니다:</p>
        <p><strong>${qrCode}</strong></p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          이 메일은 자동으로 발송되었습니다. 문의사항이 있으시면 관리자에게 연락주세요.
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: `이메일이 ${email}로 발송되었습니다.`,
    });
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
