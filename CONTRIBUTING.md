# 🤝 Panduan Kontribusi

## 📋 Selamat Datang!

Terima kasih telah tertarik untuk berkontribusi pada proyek SSSS Komik! Dokumentasi ini akan memandu Anda melalui proses kontribusi yang efektif dan efisien.

## 🎯 Cara Berkontribusi

### 1. 🐛 Melaporkan Bug
Jika Anda menemukan bug, silakan:

1. **Cek Issues yang sudah ada** - Pastikan bug belum dilaporkan
2. **Gunakan template bug report** - Isi semua informasi yang diperlukan
3. **Sertakan detail lengkap**:
   - Langkah reproduksi
   - Environment (OS, browser, versi)
   - Screenshot atau video jika diperlukan
   - Expected vs actual behavior

### 2. ✨ Mengusulkan Fitur Baru
Untuk mengusulkan fitur baru:

1. **Cek roadmap** - Pastikan fitur belum direncanakan
2. **Diskusikan terlebih dahulu** - Buat issue untuk diskusi
3. **Sertakan use case** - Jelaskan mengapa fitur ini diperlukan
4. **Berikan contoh** - Jika memungkinkan, berikan mockup atau contoh

### 3. 💻 Berkontribusi Kode
Untuk berkontribusi kode:

1. **Fork repository**
2. **Buat feature branch**
3. **Implementasi perubahan**
4. **Test perubahan Anda**
5. **Submit Pull Request**

## 🚀 Setup Development Environment

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git
- Code editor (VS Code recommended)

### Installation Steps

```bash
# 1. Fork repository di GitHub
# 2. Clone fork Anda
git clone https://github.com/YOUR_USERNAME/sssskomik.git
cd sssskomik

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/sssskomik.git

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
```

### Environment Variables
Buat file `.env.local` untuk development:

```bash
# Copy dari .env.example
cp .env.example .env.local

# Edit sesuai kebutuhan
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your_local_database_url
```

## 🔄 Development Workflow

### 1. Starting New Work

```bash
# Update local develop branch
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Start development
# ... make your changes ...
```

### 2. Making Changes

#### Code Standards
- Ikuti [Coding Standards](./CODING_STANDARDS.md)
- Gunakan TypeScript untuk semua file
- Ikuti naming conventions yang sudah ditetapkan
- Write meaningful commit messages

#### Testing
- Tulis unit tests untuk fungsi baru
- Test komponen dengan React Testing Library
- Pastikan semua tests pass

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type check
npm run type-check
```

### 3. Submitting Changes

```bash
# Commit changes
git add .
git commit -m "feat: add user authentication form"

# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request
```

## 📝 Pull Request Guidelines

### PR Checklist
Sebelum submit PR, pastikan:

- [ ] Code follows project standards
- [ ] All tests pass
- [ ] ESLint passes without errors
- [ ] TypeScript compilation successful
- [ ] Self-review completed
- [ ] Documentation updated (if needed)
- [ ] No console.log statements
- [ ] Responsive design tested
- [ ] Accessibility considerations

### PR Description Template

```markdown
## 📋 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## 📸 Screenshots (if applicable)
[Add screenshots here]

## 🔗 Related Issues
Closes #123
Fixes #456

## 📚 Additional Notes
Any additional information for reviewers
```

## 🧪 Testing Guidelines

### Unit Testing
- Test individual functions dan components
- Use descriptive test names
- Mock external dependencies
- Aim for good coverage

```tsx
// Example test
describe('UserProfile', () => {
  it('should display user information correctly', () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

### Integration Testing
- Test component interactions
- Test API integrations
- Test user workflows

### Manual Testing
- Test di berbagai browser
- Test responsive design
- Test accessibility features
- Test performance

## 📚 Documentation Guidelines

### Code Documentation
- Document complex functions dengan JSDoc
- Add comments untuk business logic
- Keep README files updated

```tsx
/**
 * Validates user input and returns formatted data
 * @param userData - Raw user input data
 * @param options - Validation options
 * @returns Formatted user data or validation errors
 */
export const validateUserData = (userData: UserInput, options?: ValidationOptions) => {
  // Implementation
};
```

### README Updates
- Update README jika ada perubahan setup
- Document new features
- Update API documentation

## 🔍 Code Review Process

### For Contributors
- Respond to review comments promptly
- Make requested changes
- Ask questions jika tidak jelas
- Be open to feedback

### For Reviewers
- Review dalam 24-48 jam
- Provide constructive feedback
- Check code quality dan standards
- Test functionality jika diperlukan

### Review Focus Areas
- [ ] Code quality dan readability
- [ ] Performance implications
- [ ] Security considerations
- [ ] Test coverage
- [ ] Documentation completeness
- [ ] Breaking changes

## 🚨 Issue Guidelines

### Bug Reports
Gunakan template berikut:

```markdown
## 🐛 Bug Description
Clear description of the bug

## 🔄 Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## 🎯 Expected Behavior
What you expected to happen

## 📱 Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

## 📸 Screenshots
If applicable, add screenshots

## 📋 Additional Context
Any other context about the problem
```

### Feature Requests
```markdown
## ✨ Feature Description
Clear description of the feature

## 🎯 Problem Statement
What problem does this solve?

## 💡 Proposed Solution
Describe your proposed solution

## 🔄 Alternatives Considered
Other solutions you've considered

## 📋 Additional Context
Any other context or screenshots
```

## 🏷️ Label System

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority
- `priority: medium`: Medium priority
- `priority: low`: Low priority

### PR Labels
- `ready for review`: Ready for review
- `work in progress`: Still being worked on
- `needs testing`: Requires testing
- `breaking change`: Breaking change

## 🎉 Recognition

### Contributors
- Semua kontributor akan dicantumkan di README
- Significant contributions akan mendapat special mention
- Regular contributors bisa menjadi maintainer

### Contribution Types
- Code contributions
- Documentation improvements
- Bug reports
- Feature suggestions
- Testing
- Design feedback

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Untuk bug reports dan feature requests
- **GitHub Discussions**: Untuk diskusi umum dan Q&A
- **Pull Request Comments**: Untuk code review discussions

### Response Time
- Bug reports: 24-48 jam
- Feature requests: 1-2 minggu
- Pull requests: 24-72 jam
- General questions: 1-3 hari

## 📋 Code of Conduct

### Our Pledge
Kami berkomitmen untuk membuat environment yang welcoming dan inclusive untuk semua kontributor.

### Expected Behavior
- Gunakan bahasa yang welcoming dan inclusive
- Respect different viewpoints dan experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment atau discrimination
- Trolling, insulting, atau derogatory comments
- Public atau private harassment
- Publishing private information tanpa permission
- Unprofessional conduct

## 🎯 Getting Started

### First Contribution
Jika ini kontribusi pertama Anda:

1. **Cek issues dengan label `good first issue`**
2. **Baca dokumentasi lengkap**
3. **Setup development environment**
4. **Pilih issue yang sesuai**
5. **Comment di issue untuk claim**
6. **Mulai development**

### Recommended First Issues
- Documentation improvements
- Simple bug fixes
- UI/UX improvements
- Test coverage improvements

## 📈 Contribution Metrics

### Tracking
- Number of commits
- Lines of code contributed
- Issues resolved
- Pull requests merged
- Documentation improvements

### Recognition Levels
- **Contributor**: First contribution
- **Regular Contributor**: 5+ contributions
- **Core Contributor**: 20+ contributions
- **Maintainer**: Significant contributions + leadership

Terima kasih telah berkontribusi pada proyek SSSS Komik! 🎉
